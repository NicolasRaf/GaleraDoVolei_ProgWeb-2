
export class Player {
  public readonly id: string;
  public name: string;
  public email: string;

  constructor(id: string, name: string, email: string) {
    validateName(name);
    validateEmail(email);

    this.id = id;
    this.name = name;
    this.email = email;
  }

  updateName(newName: string): void {
    validateName(newName); 
    this.name = newName;
  }

  updateEmail(newEmail: string): void {
    validateEmail(newEmail); 
    this.email = newEmail;
  }
}

function validateName(name: string) {
  if (!name || name.trim().length === 0) {
    throw new Error("O nome do jogador não pode ser nulo ou vazio.");
  }
}

function validateEmail(email: string) {
  if (!email || email.trim().length === 0) {
    throw new Error("O email do jogador não pode ser nulo ou vazio.");
  }
  if (!email.includes("@")) {
    throw new Error("Formato de email inválido.");
  }
}