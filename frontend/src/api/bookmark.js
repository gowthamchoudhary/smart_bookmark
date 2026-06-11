import apiClient from "./axios";

export async function createBookmark(workspaceId, title, note, url) {
  const { data } = await apiClient.post(`/bookmarks/${workspaceId}`, {
    workspace_id: workspaceId,
    title,
    url,
    note,
  });
  return data;
}

export async function getBookmarks() {
  const { data } = await apiClient.get("/bookmarks/");
  return data;
}
