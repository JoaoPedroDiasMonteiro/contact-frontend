import { LoaderFunctionArgs, defer } from "react-router-dom";
import UserRepository from "../../repository/UserRepository";

export async function userLoader({ params }: LoaderFunctionArgs) {
  try {
    const user = UserRepository.show(parseInt(params.user ?? ''))

    return defer({ user })
  } catch (error) {
    throw new Response("Not Found", { status: 404 });
  }
}