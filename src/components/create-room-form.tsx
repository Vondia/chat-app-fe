"use client";

// components/ChatRoomForm.tsx
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

// Define a Zod schema
const chatRoomSchema = z.object({
  name: z.string().min(1, "Chat room name is required"),
  users: z.array(
    z.object({
      id: z.string().min(1, "User ID is required"),
      name: z.string().min(1, "User name is required"),
      email: z.string().email("Invalid email format")
    })
  ).nonempty("At least one user is required")
});

type ChatRoomFormData = z.infer<typeof chatRoomSchema>;

export default function ChatRoomForm({ userData, userError }: { userData: any; userError: any }) {
    const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ChatRoomFormData>({
    resolver: zodResolver(chatRoomSchema)
  });

  const onSubmit = async (data: ChatRoomFormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/chatroom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create chat room');
      }

      const result = await response.json();
      console.log('Chat room created:', result);
      router.push(`/chatroom/${result.id}`);
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message); // Type-safe error handling
      } else {
        setServerError('An unknown error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Chat Room Name</label>
        <input id="name" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="userId">User ID</label>
        <input id="userId" {...register('users.0.id')} />
        {errors.users?.[0]?.id && <p>{errors.users[0].id?.message}</p>}
      </div>

      <div>
        <label htmlFor="userName">User Name</label>
        <input id="userName" {...register('users.0.name')} />
        {errors.users?.[0]?.name && <p>{errors.users[0].name?.message}</p>}
      </div>

      <div>
        <label htmlFor="userEmail">User Email</label>
        <input id="userEmail" {...register('users.0.email')} />
        {errors.users?.[0]?.email && <p>{errors.users[0].email?.message}</p>}
      </div>

      {serverError && <p>{serverError}</p>}

      <button type="submit">Create Chat Room</button>
    </form>
  );
}
