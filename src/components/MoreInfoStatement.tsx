import { IBankStatement } from "@/interfaces";
import { activateLoader, deactivateLoader } from "@/redux/loaderSlice";
import { currencyFormat } from "@/shared/currencyFormat";
import { format } from "date-fns";
import React from "react";
import { useDispatch } from "react-redux";
import { EditBankStatementForm } from "./EditBankStatementForm";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Separator } from "./ui/separator";
import { toast } from "./ui/use-toast";

type MoreInfoStatementProps = {
  bankStatement: IBankStatement;
};

export const MoreInfoStatement: React.FC<MoreInfoStatementProps> = ({ bankStatement }) => {
  const dispatch = useDispatch();

  const handleDeleteBankStatement = async () => {
    dispatch(activateLoader("Excluindo extrato. Aguarde"));

     setTimeout(() => {
      toast({
        title: "Excluído com sucesso! ✅",
        description: "Agora o seu extrato está atualizado.",
      });

      dispatch(deactivateLoader());
    }, 2000);
  }

  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Extrato</DrawerTitle>
          <DrawerDescription>
            Veja todas as informações do seu extrato.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex-1 text-center">
              <div className="text-3xl font-bold tracking-tighter">
                {currencyFormat(bankStatement.amount)}
              </div>
              <div className="text-xs uppercase text-muted-foreground">
                Valor do extrato
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-4">
            <div className="flex items-center justify-between leading-none text-sm">
              <p>Nome</p>
              <p className="font-semibold capitalize">{bankStatement.name}</p>
            </div>
            <div className="flex items-center justify-between leading-none text-sm">
              <p>Data da transação</p>
              <p className="font-semibold">
                {format(bankStatement.dateTransaction, "dd/MM/yyyy")}
              </p>
            </div>
            <div className="flex items-center justify-between leading-none text-sm">
              <p>Data de criação</p>
              <p className="font-semibold">
                {format(bankStatement.created_At, "dd/MM/yyyy")}
              </p>
            </div>
            <div className="flex items-center justify-between leading-none text-sm">
              <p>Data de edição</p>
              <p className="font-semibold">
                {format(bankStatement.updated_At, "dd/MM/yyyy")}
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          <p className=" text-sm text-muted-foreground text-center">
            Se alguma informação não esta correta, clique no botão embaixo para
            editar.
          </p>
        </div>
        <DrawerFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Editar</Button>
            </DialogTrigger>

            <EditBankStatementForm bankStatement={bankStatement} />
          </Dialog>
          <DrawerClose asChild onClick={handleDeleteBankStatement}>
            <Button variant="destructive">Excluir extrato</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
};
