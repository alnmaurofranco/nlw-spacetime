export abstract class Controller<UseCase, Req, Res> {
  protected readonly useCase: UseCase

  constructor(useCase: UseCase) {
    this.useCase = useCase
  }

  abstract handle(request: Req, response: Res): Promise<Res>
}
