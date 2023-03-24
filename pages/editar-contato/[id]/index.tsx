import { useEffect, useState, } from "react";
import { useRouter } from 'next/router';

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { ContainerRowInput } from "../../../src/components/Form/ContainerRowForm";
import { Input } from "../../../src/components/Form/Input";
import { Loading } from "../../../src/components/Loading";

import { Header } from "../../../src/components/Header";
import { IContact } from "../../../src/interfaces/global";
import { api } from "../../api/axios";





const RegisterSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    cpf: yup.string().min(10, 'Cpf deve ter pelo menos 11 caracteres')
        .max(11, 'Telefone não deve ter mais do que 11 caracteres')
        .required('CPF é obrigatório'),
    date_born: yup.string().required('Data de nascimento é obrigatório'),
    numbers: yup.string()
        .min(10, 'Telefone deve ter pelo menos 10 caracteres')
        .max(11, 'Telefone não deve ter mais do que 11 caracteres')
        .required('Telefone é obrigatório'),
});



export default function EditarContato() {
    const [isSending, setIsSending] = useState(false);
    const [contact, setContact] = useState<IContact | null>(null);

    const { register, handleSubmit, formState, setValue, reset, control, } = useForm({
        resolver: yupResolver(RegisterSchema),
        reValidateMode: 'onBlur',
    });


    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            api.get(`/schedule/${id}`)
                .then(response => {
                    setContact(response.data);
                    setValue('name', response.data.name);
                    setValue('email', response.data.email);
                    setValue('cpf', response.data.cpf);
                    setValue('date_born', response.data.date_born);
                    setValue('numbers', response.data[0].numbers);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, []);





    const handleSubmitFormEditContact = async (data: IContact) => {
        setIsSending(true);
        const { name, email, cpf, date_born, numbers } = data;
        const cpfString = cpf.toString()
        const numberString = numbers.toString()

        const contactUser = {
            name: name,
            numbers: [numberString],
            email: email,
            cpf: cpfString,
            date_born: date_born,
        }


        if (id) {
            api.put(`/schedule/${id}`, contactUser)
                .then(response => {
                    console.log(response);
                    router.push('/');
                })
                .catch(error => {
                    console.log(error);
                });
        }
        setIsSending(false);
    }

    if (!contact) {
        return (
            <>
                <Header />
                <div className="flex items-center justify-center">
                    <div>Carregando...</div>
                </div>
            </>
        );
    }
    return (
        <>
            <Header />
            <div className="flex items-center  justify-center">
                <div className="border bg-white rounded-lg shadow-lg flex flex-col w-[500px] mt-[-50px] p-5 mx-auto  max-w-3xl ">

                    <form className="flex flex-col gap-8  max-w-xs md:max-w-2xl items-center px-4"
                        onSubmit={handleSubmit(handleSubmitFormEditContact as any)}
                    >

                        <ContainerRowInput>
                            <Input
                                inputRow
                                label="Nome"
                                type="text"
                                placeholder="Nome"
                                {...register('name' as never)}
                                error={formState.errors.name as never}
                                required
                            />
                        </ContainerRowInput>
                        <ContainerRowInput>
                            <Input
                                inputRow
                                label="Data de nascimento"
                                type="date"
                                placeholder="Data de nascimento"
                                {...register('date_born' as never)}
                                error={formState.errors.date_born as never}
                                required
                            />
                        </ContainerRowInput>

                        <ContainerRowInput>

                            <Input
                                inputRow
                                label="Email"
                                type="email"
                                placeholder="Email"
                                {...register('email' as never)}
                                error={formState.errors.email as never}
                                required
                            />

                        </ContainerRowInput>
                        <ContainerRowInput>
                            <Input
                                type="number"
                                placeholder="999.999.999-99"
                                {...register("cpf" as never)}
                                label="Cpf"
                                inputRow
                                error={formState.errors.cpf as never}
                                required
                            />

                        </ContainerRowInput>
                        <ContainerRowInput>
                            <Input
                                type="number"
                                placeholder="(99) 99999-9999"
                                {...register("numbers" as never)}
                                label="Telefone"
                                inputRow
                                required
                                error={formState.errors.numbers as never}
                            />

                        </ContainerRowInput>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 sm:justify-center sm:items-center justify-start w-full max-w-[240px] sm:max-w-full">
                            <button
                                type="submit"
                                className="bg-primary flex flex-row w-full min-w-[240px] sm:w-fit self-center items-center justify-center rounded-md text-white px-4 py-2 "
                                disabled={isSending}
                            >
                                {
                                    isSending ? (
                                        <Loading color="white" />
                                    )
                                        :
                                        "Salvar"
                                }
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )

}