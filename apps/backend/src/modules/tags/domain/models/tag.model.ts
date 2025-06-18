interface TagModelData {
  id: string;
  name: string;
  slug: string;
}

export class TagModel {
  static from(data: TagModelData) {
    return new TagModel(data.id, data.name, data.slug);
  }

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly slug: string
  ) {}
}
