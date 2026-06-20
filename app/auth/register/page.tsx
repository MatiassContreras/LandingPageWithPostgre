import FormularioRegister from "@/app/components/FormularioRegister";
import FormularioLogin from "../../components/FormularioLogin";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
 export const metadata: Metadata = {
        title: "Registrarse - Zaragoza II",
        description: "H",
    };

export default async function Inicio() {


   
  return (
    <FormularioRegister />
  )
}