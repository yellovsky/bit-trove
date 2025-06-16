interface TagModelData {
  id: string;
  name: string;
}

export class TagModel {
  static from(data: TagModelData) {
    return new TagModel(data.id, data.name);
  }

  constructor(
    public readonly id: string,
    public readonly name: string
  ) {}
}
