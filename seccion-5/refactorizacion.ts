// creo una interfaz User para mejorar el tipado.
export interface User{
    id:number;
    name:string;
    role:string;
    isActive:boolean;
}


class UserService {
  private users: User[];
  private lastId: number = 0;

  // en el constructor agrego el parametro 'users' y lo asigno para que 'users' 
  // no esté acoplada a la clase y pueda ser proporcionado desde fuera
  constructor(users: User[]) {
    this.users = users
    // eliminé la asignación de 'lastId' con .length ya que el último id del user no necesariamente 
    // coincide con el tamaño de 'users' ya que podrian no ser ids consecutivos. l
    // lo reemplaze por users[users.length -1].id que obtiene correctamente el id del ultimo elemento de users.
    this.lastId = users[users.length - 1].id;
  }

  // agregué un tipo de retorno para mejorar la seguridad de tipos
  // uso la funcion .find en vez del bucle 'for' ya que es mas directa encontrando la primera coincidencia dada la condición
  // si no encuentra devuleve undefined, por eso los dos tipos de retorno
  getUser(id: number): User|undefined {
    const user = this.users.find((u) => u.id === id);
    return user;
  }

  // agregué tipo de retorno User[], en este caso no puse undefined
  // porque filter sino cumple la condición devuelve un array vacio
  // usé filter ya que devuelve un array que cumpla con la condición y además es mas conciso.
  getUsersByRole(role: string): User[] {
    const users = this.users.filter((u) => u.role === role); 
    return users;
  }

  // eliminé el for para evitar mayor anidación y opté por una opcion mas funcional como findIndex
  // si encuentra el indice lo elimina con splice
  deleteUser(id: number): void {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  // agregue el tipaod user: User
  addUser(user: User): void {
    if (user.id && user.name && user.role) {
      this.users.push(user);
    }
  }

  activateUser(id: number): void {
    let user = this.getUser(id);
    if (user) {
      user.isActive = true;
    }
  }

  deactivateUser(id: number): void {
    let user = this.getUser(id);
    if (user) {
      user.isActive = false;
    }
  }

  // cambio el tipo de retorno a User[]
  // cambio 'for' por filter para ser mas conciso
  getActiveUsers(): User[] {
    const activeUsers = this.users.filter((u) => u.isActive)
    return activeUsers;
  }
}

// Instrucciones:
// - Refactorizar el código para mejorar su eficiencia, legibilidad y mantenibilidad.
// - Aplicar tipado adecuado, métodos más claros y evitar repetición de código.
// - Explicar brevemente qué mejoras aplicaste y por qué.
