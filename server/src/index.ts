import { Controller } from '@core/controller'
import { Either, Left, Right } from '@core/logic/either'
import { UseCase } from '@core/use-case'

export class CreateUseCase extends UseCase<
  { valueInNumber: number },
  Either<{ message: 'Error' }, { status: string }>
> {
  constructor() {
    super()
  }

  async execute(input: {
    valueInNumber: number
  }): Promise<Either<{ message: 'Error' }, { status: string }>> {
    const statusCodeName: Record<number, string> = {
      200: 'OK',
      201: 'Created',
      202: 'Accepted',
    }
    const result = statusCodeName[input.valueInNumber]
    if (!result) {
      return new Left({ message: 'Error' })
    }
    return new Right({
      status: result,
    })
  }
}

export class CreateController extends Controller<CreateUseCase, any, any> {
  constructor(createUseCase: CreateUseCase) {
    super(createUseCase)
  }

  async handle(request: any, response: any): Promise<any> {
    const result = await this.useCase.execute({ valueInNumber: 201 })
    if (result.isLeft()) {
      return result.value.message
    }
    const { status } = result.value
    return status
  }
}

;(async () => {
  const useCase = new CreateUseCase()
  const controller = new CreateController(useCase)
  const result = await controller.handle({}, {})
  console.log(result)
})()
