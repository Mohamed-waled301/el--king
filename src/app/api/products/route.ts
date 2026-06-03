import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const productsFilePath = path.join(process.cwd(), "src/data/products.json");

export async function GET() {
  try {
    const fileContents = await fs.readFile(productsFilePath, "utf8");
    const products = JSON.parse(fileContents);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read products data." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProduct = await request.json();
    const fileContents = await fs.readFile(productsFilePath, "utf8");
    const products = JSON.parse(fileContents);
    const product = {
      ...newProduct,
      id: Math.random().toString(36).substr(2, 9),
      rating: newProduct.rating || 4.5,
      reviewCount: newProduct.reviewCount || 0,
      inStock: newProduct.inStock !== undefined ? newProduct.inStock : true,
      isNew: true,
      isBestseller: false,
      discount: newProduct.originalPrice
        ? Math.round(((newProduct.originalPrice - newProduct.price) / newProduct.originalPrice) * 100)
        : 0,
    };
    products.push(product);
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), "utf8");
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add product." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedProduct = await request.json();
    if (!updatedProduct.id) return NextResponse.json({ error: "Product ID required." }, { status: 400 });
    const fileContents = await fs.readFile(productsFilePath, "utf8");
    let products = JSON.parse(fileContents);
    products = products.map((p: any) => (p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p));
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), "utf8");
    return NextResponse.json({ success: true, message: "Product updated." });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Product ID required." }, { status: 400 });
    const fileContents = await fs.readFile(productsFilePath, "utf8");
    let products = JSON.parse(fileContents);
    products = products.filter((p: any) => p.id !== id);
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), "utf8");
    return NextResponse.json({ success: true, message: "Product deleted." });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product." }, { status: 500 });
  }
}
