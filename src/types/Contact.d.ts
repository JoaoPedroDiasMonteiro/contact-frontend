interface Contact {
    id: number,
    user_id: number,
    type: 'whatsapp' | 'email' | 'phone',
    value: string,
    created_at: string,
    updated_at: string | null,
}