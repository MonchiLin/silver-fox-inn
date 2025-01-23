export namespace LocationExt {
  export const getSearchParams = () => {
    return new URLSearchParams(window.location.search)
  }
}
