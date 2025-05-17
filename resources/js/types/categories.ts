interface CreateCategoryPayload {
  name: string;
}

interface SearchCategoryPayload {
  name?: string;
  menu_status?: number;
}

interface CategoryItem {
  id: number;
  name: string;
  menu_status: number;
}
