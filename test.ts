// domain
export interface User {
    name: string;
};

// repositoryの定義
export interface UserRepositoryInterface {
    getUser: () => Promise<User>;
    addUser: (user: User) => Promise<void>;
}

// repositoryの実体
// Firebase使う
// この中に外部サービスとの接続部分を隠蔽する
export class UserFirebaseRepository implements UserRepositoryInterface {
    async getUser() {
        const users = await db.collection("users").get();
        return users[0] as User;
    }

    async addUser(user: User){
        await db.collection("users").add(user);
    }
}

// 内部メモリ使う
// この中に外部サービスとの接続部分を隠蔽する
export class UserInmemoryRepository implements UserRepositoryInterface {
    private users: User[] = [];

    async getUser() {
        return this.users[0];
    }

    async addUser(user: User) {
        this.users.push(user);
    }
}

// Serviceの作成
export class UserService {
    private userRepository: UserRepositoryInterface;

    constructor(ur: UserRepositoryInterface) {
        this.userRepository = ur;
    }

    async getUser() {
        return this.userRepository.getUser();
    }

    async addUser(user: User) {
        return this.userRepository.addUser(user);
    }
}

// Repositoryの作成
const userFirebaseRepository = new UserFirebaseRepository();
const userInmemoryRepository = new UserInmemoryRepository();

// Serviceの作成
const userService = new UserService(userFirebaseRepository);
const userService = new UserService(userInmemoryRepository);

const user = await userService.getUser();


// Repository
class TopazProdDataBase {
    getProjects() {
        return prod.db.get();
    }
}

class TopazStgDataBase {
    getProjects() {
        return stg.db.get();
    }
}

// Service
class TopazService() {
    private topazRepository;

    constructor(tr) {
        this.topazRepository = tr;
    }

    getProjects() {
        this.topazRepository.getProjects();
    }
}

const prod = new TopazProdDataBase()
const stg = new TopazStgDataBase()

// DI 依存性の注入
const service = new TopazService();

const projects = service.getProjects();


describe("サービスのテスト", () => {
    it("getProjectが正しいかどうか", async () => {
        const repository = new TopazStgDataBase();
        const service = new TopazService(repository);

        const expectName = "recoilについて"

        const project = await service.getProjects();
        expect(project.name).toBe(expectName);
    })
})