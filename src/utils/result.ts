export interface Result<T> {
  $: T,
  msg: string,
  code: number,
}

export class Result<T> implements Result<T> {
  $!: T
  msg!: string
  code!: number

  static Success<T>(data: T): Result<T> {
    const result = new this<T>();

    result.$ = data
    result.msg = "success"
    result.code = 0

    return result
  }

  static Failure<T>(code: number, msg: string): Result<T> {
    const result = new this<T>();

    result.msg = msg
    result.code = code

    return result
  }

  static JSONResponse<T>(response: T, init?: ResponseInit) {
    init = init || {}
    init.headers = init.headers || {}

    return new Response(JSON.stringify(Result.Success(response)), {
      ...init,
      headers: {
        ...init.headers,
        "Content-Type": "application/json; charset=utf-8",
      },
    })
  }

}
