import { z } from "zod"

import { Order, selectOrder } from "@/models/order"
import { adminProcedure, authenticatedProcedure, publicProcedure, router } from "@/server/trpc"
/*
What the hell?
 */
export const orderRouter = router({
    getOrder: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .output(z.nullable(Order))
        .query(async ({ ctx, input }) => {
            return ctx.prisma.order.findFirst({
                select: selectOrder,
                where: {
                    id: input.id
                }
            })
        }),
    getOrders: publicProcedure
        .output(z.array(Order))
        .query(async ({ ctx }) => {
            return ctx.prisma.order.findMany({
                select: selectOrder
            })
        }),
    createOrder: authenticatedProcedure
        .input(z.object({
            createdAt: z.date(),
            completed: z.boolean(),
            userId: z.string(),
        }))
        .output(Order)
        .query(async ({ ctx, input }) => {
            return ctx.prisma.order.create({
                select: selectOrder,
                data: { ...input, userId: ctx.user.id }
            })
        }),
    updateOrder: adminProcedure
        .input(z.object({
            id: z.string(),
            createdAt: z.date(),
            completed: z.boolean(),
            userId: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.order.update({
                data: input,
                where: {
                    id: input.id
                }
            })
        }),
    deleteOrder: adminProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.order.delete({
                where: input
            })
        })

})

