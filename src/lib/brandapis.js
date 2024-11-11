export async function fetchModels(brandname, currentPage, pageSize, search) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}brands/models?brandSlug=${brandname || ''}&page=${currentPage || 1}&pageSize=${pageSize || 9}&searchTerm=${search || ''} `);
    const data = await response.json();
    return data;
}

export async function fetchBrandDetails(brandname) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}brands/details?brandSlug=${brandname || ''}`);
    const data = await response.json();
    return data;
}

export async function fetchBrandDealers(brandname,branchname, currentPage, pageSize) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}car-dealers/by-filter?brandSlug=${brandname || ''}&dealerBranch=${branchname || ''}&page=${currentPage || 1}&pageSize=${pageSize || 9}`);
    const data = await response.json();
    return data;
}

export async function fetchBrandVideos(brandname, currentPage, pageSize) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}car-videos/by-brands-and-models?brands=${brandname || ''}&page=${currentPage || 1}&pageSize=${pageSize || 9}`);
    const data = await response.json();
    return data;
}

