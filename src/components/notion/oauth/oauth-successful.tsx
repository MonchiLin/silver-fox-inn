export default function OAuthSuccessful() {
  const accessToken = new URLSearchParams(new URL(window.location.href).search).get("accessToken")

  return <div>
    <h1>Your access token is</h1>
    <span>{accessToken}</span>
  </div>
}
