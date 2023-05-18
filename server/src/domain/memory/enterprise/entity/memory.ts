import { Entity } from '@core/entity'
import { Optional } from '@core/types/optional'
import { UniqueEntityID } from '@core/value-object/unique-entity-id'

export type MemoryProps = {
  userId: string
  coverUrl: string
  content: string
  isPublic: boolean
  createdAt: Date
}

export class Memory extends Entity<MemoryProps> {
  public get userId(): MemoryProps['userId'] {
    return this.props.userId
  }

  public get coverUrl(): MemoryProps['coverUrl'] {
    return this.props.coverUrl
  }

  private set coverUrl(value: MemoryProps['coverUrl']) {
    this.props.coverUrl = value
  }

  public get content(): MemoryProps['content'] {
    return this.props.content
  }

  private set content(value: MemoryProps['content']) {
    this.props.content = value
  }

  public get isPublic(): MemoryProps['isPublic'] {
    return this.props.isPublic
  }

  private set isPublic(value: MemoryProps['isPublic']) {
    this.props.isPublic = value
  }

  public get createdAt(): MemoryProps['createdAt'] {
    return this.props.createdAt
  }

  public excerpt() {
    return this.props.content.substring(0, 115).concat('...')
  }

  private constructor(
    props: Optional<MemoryProps, 'isPublic' | 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    super(
      {
        ...props,
        isPublic: props.isPublic ?? false,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }

  public update(
    props: Pick<MemoryProps, 'content' | 'isPublic' | 'coverUrl'>,
  ): void {
    this.content = props.content
    this.isPublic = props.isPublic
    this.coverUrl = props.coverUrl
  }

  public static create(
    props: Optional<MemoryProps, 'isPublic' | 'createdAt'>,
    id?: UniqueEntityID,
  ): Memory {
    const memory = new Memory(props, id)
    return memory
  }
}
