import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { activateLoader, deactivateLoader } from "@/redux/loaderSlice";
import { HelperText } from "@/shared/HelperText";
import { zodResolver } from "@hookform/resolvers/zod";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

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

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async () => {
    dispatch(activateLoader("Cadastrando extrato. Aguarde"));
    
    setTimeout(() => {
      toast({
        title: "Cadastrado com sucesso! ✅",
        description:
          "Na página de extratos você pode visualizar o extrato que acabou de realizar.",
      });

      dispatch(deactivateLoader());
      navigate("/bank-statements");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative">
      <Button className="flex text-start w-fit absolute top-5 right-5" variant="secondary" asChild>
        <Link to="/bank-statements">
          Ver extratos
        </Link>
      </Button>
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Cadastre seu gastos</CardTitle>
          <CardDescription>
            Preencha todos os campos para prosseguir.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                      defaultValue={field.value}
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
                />
                <HelperText message={errors.spent?.message} />
              </div>

              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <div className="flex flex-col space-y-1.5">
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
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
            Cadastrar
            {isSubmitting && <Loader2 className="animate-spin ml-1" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
