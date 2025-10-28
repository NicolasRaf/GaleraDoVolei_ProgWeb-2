export type Zona = 'Norte' | 'Sul' | 'Leste' | 'Oeste';

export class Arena {
  public readonly id: string;
  public nome: string;
  public endereco?: string;
  public geolocalizacao?: string;
  public zona: Zona;

    constructor(id: string, nome: string, zona: Zona, endereco?: string, geolocalizacao?: string) {
        validateNome(nome);
        validateZona(zona);
        validateEndereco(endereco, geolocalizacao);

        this.id = id;
        this.nome = nome;
        this.zona = zona;
        this.endereco = endereco;
        this.geolocalizacao = geolocalizacao;
    }

    updateAddress(newAddress?: string): void {
        this.endereco = newAddress;
    }

    updateNome(novoNome: string): void {
        validateNome(novoNome);
        this.nome = novoNome;
    }

    updateZona(novaZona: Zona): void {
        validateZona(novaZona);
        this.zona = novaZona;
    }

    updateEndereco(novoEndereco?: string): void {
        this.endereco = novoEndereco;
    }

    updateGeolocalizacao(novaGeo?: string): void {
        this.geolocalizacao = novaGeo;
    }
}

function validateNome(nome: string) {
    if (!nome || nome.trim().length === 0) {
        throw new Error("O nome da arena não pode ser vazio.");
    }
}
function validateZona(zona: Zona) {
    if (!zona || zona.trim().length === 0) {
        throw new Error("A zona da arena não pode ser vazia.");
    }
    if (zona !== 'Norte' && zona !== 'Sul' && zona !== 'Leste' && zona !== 'Oeste') {
        throw new Error("A zona da arena é inválida.");
    }
}

function validateEndereco(endereco?: string, geolocalizacao?: string) {
    if (endereco && endereco.trim().length === 0) {
        throw new Error("O endereço da arena não pode ser vazio.");
    }
    if (geolocalizacao && geolocalizacao.trim().length === 0) {
        throw new Error("A geolocalização da arena não pode ser vazia.");
    }
}