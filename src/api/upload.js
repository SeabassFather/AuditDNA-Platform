export async function uploadFile(file) {
  const fd = new FormData();
  fd.append("doc", file);
  return fetch("/api/upload/file", { method: "POST", body: fd }).then(res => res.json());
}
