export const getByDataTestId = (id: string) => {
  return document.querySelector(`[data-test-id="${id}"]`)
}

export const getRowByTestId = (id: string) => {
  const element = getByDataTestId(id)
  return element?.closest('tr') ?? null
}
