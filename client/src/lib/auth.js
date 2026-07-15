'use server'

import { cookies } from 'next/headers';
import { cache } from 'react';
import { authAPI } from '@/api/auth';

export const getServerSession = cache(async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get('user_context')?.value;
  if (!raw) return null;
  try {
    const user = JSON.parse(raw);
    return { id: user.id, name: user.name, role: user.role };
  } catch {
    return null;
  }
});

export async function createAccountAction(formData) {
  try {
    const { name, email, password: provider_key } = formData;
    const payload = { name, email, provider_key };
    const response = await authAPI.server.createAccount(payload);

    const cookieStore = await cookies();
    cookieStore.set('token', response.token, { httpOnly: true, sameSite: 'strict', maxAge: 30 });
    cookieStore.set('user_context', JSON.stringify(response.user), { httpOnly: false, sameSite: 'strict', maxAge: 30 });

    return { success: true, user: response.user, token: response.token, error: null };

    } catch (error) {
    return { error: error?.message };
  }
}

export async function loginAction(formData) {

  try {
    const { email, password: provider_key } = formData;
    const payload = { email, provider_key };
    const response = await authAPI.server.login(payload);

    const cookieStore = await cookies();
    cookieStore.set('token', response.token, { httpOnly: true, sameSite: 'strict', maxAge: 60 });
    cookieStore.set('user_context', JSON.stringify(response.user), { httpOnly: false, sameSite: 'strict', maxAge: 60 });

    return { success: true, user: response.user, token: response.token, error: null };

  } catch (error) {
    return { error: error?.message };
  }
}

export async function changePasswordAction(formData) {
  try {
    const { current_password, new_password } = formData;
    const payload = { current_password, new_password };
    await authAPI.server.updatePassword(payload);
    return { success: true, error: null };

  } catch (error) {
    if (error?.digest?.startsWith('NEXT_REDIRECT')) throw error;
    return { error: error?.message };
  }
}