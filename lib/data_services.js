'use server';

import { supabase } from './db';
import { revalidatePath } from 'next/cache';

// Helper function to ensure product data is valid
function validateProductData(data) {
  if (!data) return null;
  
  // If data is an array, map over it
  if (Array.isArray(data)) {
    return data.map(product => ({
      id: product.id,
      name: product.name || 'Unnamed Product',
      description: product.description || '',
      category: product.category || 'Uncategorized',
      image: product.image || '/placeholder.png',
      created_at: product.created_at || new Date().toISOString(),
      updated_at: product.updated_at || new Date().toISOString()
    }));
  }
  
  // If data is a single product
  return {
    id: data.id,
    name: data.name || 'Unnamed Product',
    description: data.description || '',
    category: data.category || 'Uncategorized',
    image: data.image || '/placeholder.png',
    created_at: data.created_at || new Date().toISOString(),
    updated_at: data.updated_at || new Date().toISOString()
  };
}

// Product functions
export async function getAllProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        throw error;
    }

    return validateProductData(data);
}

export async function getProductById(id) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching product:', error);
        throw error;
    }

    return validateProductData(data);
}

export async function createProduct(productData) {
    const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

    if (error) {
        console.error('Error creating product:', error);
        throw error;
    }

    revalidatePath('/');
    return validateProductData(data);
}

export async function updateProduct(id, productData) {
    const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating product:', error);
        throw error;
    }

    revalidatePath('/');
    return validateProductData(data);
}

export async function deleteProduct(id) {
  try {
    const { data: product, error: fetchError } = await supabase
      .from('products')
      .select('image')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching product for deletion:', fetchError);
      throw fetchError;
    }

    if (product && product.image) {
      const imagePath = product.image.split('/images/')[1];

      if (imagePath) {
        const { error: deleteImageError } = await supabase.storage
          .from('images')
          .remove([imagePath]);

        if (deleteImageError) {
          console.error('Error deleting image from storage:', deleteImageError);
        }
      }
    }

    const { error: deleteProductError } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (deleteProductError) {
      console.error('Error deleting product record:', deleteProductError);
      throw deleteProductError;
    }

    revalidatePath('/');

  } catch (error) {
    console.error('Full delete operation error:', error);
    throw error;
  }
}

export async function getProductsByCategory(category) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }

    return validateProductData(data);
}

export async function searchProducts(searchTerm) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error searching products:', error);
        throw error;
    }

    return data;
}

export async function updateProductQuantity(id, quantity) {
    const { data, error } = await supabase
        .from('products')
        .update({
            quantity: quantity,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating product quantity:', error);
        throw error;
    }

    return data;
}

export async function uploadFile(file) {
    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const timestamp = Date.now();
        const filename = `${timestamp}-${file.name}`;

        const { data, error } = await supabase.storage
            .from('images')
            .upload(filename, buffer, {
                contentType: file.type,
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filename);

        // console.log('Generated public URL (upload):', publicUrl);

        return publicUrl;
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
}

// Category functions
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
  return data;
}

export async function createCategory(name) {
  const { data, error } = await supabase
    .from('categories')
    .insert([{ name }])
    .select()
    .single();

  if (error) {
    console.error('Error creating category:', error);
    throw error;
  }

  revalidatePath('/dashboard/categories');
  return data;
}

export async function deleteCategory(id) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting category:', error);
    throw error;
  }

  revalidatePath('/dashboard/categories');
}