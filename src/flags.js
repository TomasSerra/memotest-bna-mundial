const FILES = [
  "Alemania_Cen.jpg",
  "Arabia_Saudita_Cen.jpg",
  "Argelia_Cen.jpg",
  "Argentina_Cen.jpg",
  "Australia_Izq.jpg",
  "Austria_Cen.jpg",
  "Belgica_Cen.jpg",
  "Bosnia-Herz_Cen.jpg",
  "Brasil_cen.jpg",
  "Cabo Verde_Cen.jpg",
  "Canada_Cen.jpg",
  "Colombia_Cen.jpg",
  "Corea_del_Sur_Cen.jpg",
  "Costa de Marfil_Cen.jpg",
  "Croacia_Cen.jpg",
  "Curazao_Izq.jpg",
  "Ecuador_Cen.jpg",
  "Egipto_Cen.jpg",
  "Escocia_Cen.jpg",
  "Espana_Izq.jpg",
  "Francia_Cen.jpg",
  "Ghana_Cen.jpg",
  "Haiti_Cen.jpg",
  "Inglaterra_Cen.jpg",
  "Irak_Cen.jpg",
  "Iran_Cen.jpg",
  "Japon_Cen.jpg",
  "Jordania_Izq.jpg",
  "Marruecos_Cen.jpg",
  "Mexico_Cen.jpg",
  "Noruega_Izq.jpg",
  "Nueva Zelanda_Izq.jpg",
  "Paises Bajos_Cen.jpg",
  "Panama_Cen.jpg",
  "Paraguay_Cen.jpg",
  "Portugal_izq.jpg",
  "Qatar_Izq.jpg",
  "Rep. Checa_Izq.jpg",
  "Rep. Del Congo_Izq.jpg",
  "Senegal_Cen.jpg",
  "Sudafrica_Izq.jpg",
  "Suecia_Izq.jpg",
  "Suiza_Cen.jpg",
  "Tunez_Cen.jpg",
  "Turquia_Izq.jpg",
  "USA_Izq.jpg",
  "Uruguay_Izq.jpg",
  "Uzbekistan_Izq.jpg",
];

const DISPLAY_NAMES = {
  USA: "Estados Unidos",
  "Bosnia-Herz": "Bosnia y Herzegovina",
  "Rep. Checa": "República Checa",
  "Rep. Del Congo": "República del Congo",
  Espana: "España",
  Japon: "Japón",
  Mexico: "México",
  Panama: "Panamá",
  Belgica: "Bélgica",
  Sudafrica: "Sudáfrica",
  Tunez: "Túnez",
  Turquia: "Turquía",
  Iran: "Irán",
  Haiti: "Haití",
};

function parse(file) {
  const base = file.replace(/\.[^.]+$/, "");
  const parts = base.split("_");
  const tail = parts[parts.length - 1].toLowerCase();
  const align = tail === "izq" ? "left" : "center";
  const rawName = parts.slice(0, -1).join(" ");
  const name = DISPLAY_NAMES[rawName] || rawName;
  return {
    src: `${process.env.PUBLIC_URL}/images/banderas/${file}`,
    name,
    align,
  };
}

const FLAGS = FILES.map(parse);

export default FLAGS;
