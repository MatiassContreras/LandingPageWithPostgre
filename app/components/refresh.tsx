export function handleCambio(router: { refresh: () => void }) {
  if (router && typeof router.refresh === "function") {
    router.refresh()
  }
}
