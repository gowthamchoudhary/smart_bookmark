import apiClient from "./axios";

export async function createBookmark(workspaceId, title, url, note = null) {
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

export async function getWorkspaceBookmarks(workspaceId, page = 1, size = 10) {
  const { data } = await apiClient.get(
    `/bookmarks/${workspaceId}/paginated`,
    {
      params: { page, size },
    },
  );
  return data;
}
