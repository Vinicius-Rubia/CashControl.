import { IBankStatement } from "@/interfaces";
import { activateLoader, deactivateLoader } from "@/redux/loaderSlice";
import { HelperText } from "@/shared/HelperText";
import { zodResolver } from "@hookform/resolvers/zod";
import { ptBR } from "date-fns/locale";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "./ui/use-toast";

const FormSchema = z.object({
  name: z.string({
    required_error: "Selecione um item.",
  }),
  spent: z.string().min(1, {
    message: "Digite o valor do gasto.",
  }),
  date: z.date({
    required_error: "Selecione uma data.",
  }),
});

type EditBankStatementFormProps = {
  bankStatement: IBankStatement;
}

export const EditBankStatementForm: React.FC<EditBankStatementFormProps> = ({ bankStatement }) => {
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async () => {
    dispatch(activateLoader("Editando extrato. Aguarde"));

    setTimeout(() => {
      toast({
        title: "Editado com sucesso! ✅",
        description: "Agora o seu extrato está atualizado.",
      });
      
      dispatch(deactivateLoader());
      document.getElementById("closeDialog")?.click();
    }, 2000);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edite seu gastos</DialogTitle>
        <DialogDescription>
          Preencha todos os campos para prosseguir.
        </DialogDescription>
      </DialogHeader>
      <form>
        <div className="grid w-full items-center gap-4">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="choose-person">Nome</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={bankStatement.name}
                >
                  <SelectTrigger id="choose-person">
                    <SelectValue placeholder="Selecione seu nome" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="vinicius">Vinicius Rubia</SelectItem>
                    <SelectItem value="alcione">Alcione Rubia</SelectItem>
                    <SelectItem value="beatriz">Beatriz Rubia</SelectItem>
                    <SelectItem value="ilson">Ilson Rubia</SelectItem>
                    <SelectItem value="lucas">Lucas Rubia</SelectItem>
                  </SelectContent>
                </Select>
                <HelperText message={errors.name?.message} />
              </div>
            )}
          />

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="value-spent">Gasto</Label>
            <Input
              id="value-spent"
              placeholder="Digite o valor do gasto"
              {...register("spent")}
              defaultValue={bankStatement.amount}
            />
            <HelperText message={errors.spent?.message} />
          </div>

          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <div className="flex flex-col space-y-1.5 mx-auto text-center">
                <Label htmlFor="choose-date">Escolha uma data</Label>
                <Calendar
                  id="choose-date"
                  mode="single"
                  onSelect={field.onChange}
                  selected={field.value}
                  disabled={(date) => date > new Date()}
                  locale={ptBR}
                  className="rounded-md border w-fit"
                />
                <HelperText message={errors.date?.message} />
              </div>
            )}
          />
        </div>
      </form>
      <DialogFooter>
        <Button type="submit" className="mx-auto" onClick={handleSubmit(onSubmit)}>
          Salvar extrato
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
