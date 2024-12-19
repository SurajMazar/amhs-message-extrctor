import prisma from "./prisma.service";

class AmhsMessagesService {

    static async get() {
        return prisma.amhs_messages.findMany({
            skip: 0,
            take: 100,
        })
    }

    static async store(data: any) {
        const existing = await prisma.amhs_messages.findFirst({
            where: {
                filename: data?.filename
            }
        })
        if (!existing) {
            await prisma.amhs_messages.create({data})
        } else {
            await prisma.amhs_messages.update({
                where: {
                    id: existing?.id
                },
                data
            })
        }
    }
}

export default AmhsMessagesService
