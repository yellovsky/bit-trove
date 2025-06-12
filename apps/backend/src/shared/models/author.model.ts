interface AuthorModelData {
  id: string;
  name: string;
}

export class AuthorModel {
  static from(data: AuthorModelData) {
    return new AuthorModel(data.id, data.name);
  }

  constructor(
    public readonly id: string,
    public readonly name: string
  ) {}
}
