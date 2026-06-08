import apiClient from "./axios";

export async function getWorkspaces() {
  const { data } = await apiClient.get("/workspace/");
  return data;
}

export async function getWorkspaceById(id) {
  const { data } = await apiClient.get(`/workspace/${id}`);
  return data;
}

export async function createWorkspace(name) {
  const { data } = await apiClient.post("/workspace/", { name });
  return data;
}

export async function updateWorkspace(id, name) {
  const { data } = await apiClient.patch(`/workspace/${id}`, null, {
    params: { name },
  });
  return data;
}

export async function deleteWorkspace(id) {
  const { data } = await apiClient.delete(`/workspace/${id}`);
  return data;
}

// Temporary aliases for code that still uses the original function names.
export const get_Workspaces = getWorkspaces;
export const get_WorkspacesById = getWorkspaceById;
export const create_workspace = createWorkspace;
export const update_workspace = (id, updateData) =>
  updateWorkspace(id, updateData?.name ?? updateData);
export const delete_workspace = deleteWorkspace;
