import { MoreInfoStatement } from "@/components/MoreInfoStatement";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerTrigger
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { selectEmployee } from "@/redux/employeesSlice";
import { currencyFormat } from "@/shared/currencyFormat";
import { format } from "date-fns";
import { Coins, Loader2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ViewBankStatements: React.FC = () => {
  const { employees } = useSelector(selectEmployee);

  const totalValue = employees.reduce(
    (sum, statement) => sum + statement.amount,
    0
  );

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <Button className="flex text-start w-fit absolute top-5 right-5" variant="secondary" asChild>
        <Link to="/">
          Voltar
        </Link>
      </Button>
      <Card className="w-[500px] mx-2">
        <CardHeader>
          <CardTitle>Seus extratos</CardTitle>
          <CardDescription>Veja todos seus extratos aqui.</CardDescription>
        </CardHeader>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <CardContent className="px-3">
            <div className="grid gap-4">
            {employees.length !== 0 ? (
              employees.map((item) => (
                <div key={item.id}>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button
                        variant="outline"
                        className="mb-4 last:mb-0 block text-start h-fit w-full"
                      >
                        <div className="grid grid-cols-2 items-center">
                          <div className="flex items-center">
                            <Coins className="mr-2 h-4 w-4" />
                            <div className="grid">
                              <h3 className="font-medium capitalize">{item.name}</h3>
                              <p className="text-xs text-muted-foreground">
                                {format(item.dateTransaction, "dd/MM/yyyy")}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-end">
                            {currencyFormat(item.amount)}
                          </p>
                        </div>
                      </Button>
                    </DrawerTrigger>
  
                    <MoreInfoStatement bankStatement={item} />
                  </Drawer>
                </div>
              ))
            ) : (
              <>
              <Loader2 className="animate-spin w-16 h-16 mx-auto" />
              <p className="text-sm mt-1 text-muted-foreground text-center animate-pulse">Aguarde...</p>
              </>
            )}
            </div>
          </CardContent>
        </ScrollArea>
        <CardFooter className="px-3 py-2">
          <Button variant="secondary" className="w-full flex justify-between">
            Valor total
            <span className="flex items-center gap-1">
              <Coins className="mr-2 h-4 w-4" />
              {currencyFormat(totalValue)}
            </span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};