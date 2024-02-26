'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { teamsSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil2Icon, PlusIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import axios from "axios";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { FancyMemberSelect } from "@/app/teams/_components/FancyMembersSelect";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Spinner from "@/components/Spinner";
import { Teams, Users } from "@/types";

interface TeamFormProps {
  team?: Teams,
  users: Users[],
}
const TeamForm = ({ team, users }: TeamFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof teamsSchema>>({
    resolver: zodResolver(teamsSchema),
    defaultValues: {
      name: team?.name || '',
      description: team?.description || '',
      industry: team?.industry || '',
      rating: team?.rating || '5.0',
      members: team?.members!.map(member => member.id) || [],
    }
  });

  useEffect(() => {
    form.reset({
      name: team?.name || '',
      description: team?.description || '',
      industry: team?.industry || '',
      rating: team?.rating || '5.0',
      members: team?.members!.map(member => member.id) || [],
    });
  }, [team]);

  async function onSubmit(data: z.infer<typeof teamsSchema>) {
    try {
      const isValid = await form.trigger();

      if (isValid) {
        if (team) {
          await axios.patch('/api/teams/' + team.id, data);
          toast.success('Team is successfully updated.');
        } else {
          await axios.post('/api/teams', data);
          toast.success('Team is successfully created.');
        }
        router.push('/teams');
        router.refresh();
        setIsDialogOpen(false);
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {team ?
          <Button className="p-3" variant="ghost"><Pencil2Icon /></Button> :
          <Button className="flex gap-2">New Team <PlusIcon /></Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {team ?
            <DialogTitle>Edit Team</DialogTitle> :
            <DialogTitle>Create New Team</DialogTitle>
          }
          <DialogClose />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of your team" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="h-20" placeholder="Description of your team" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="members"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Members</FormLabel>
                  <FormControl>
                    <FancyMemberSelect
                      team={team}
                      users={users}
                      onChange={(selected) => {
                        field.onChange(selected.map(({ id }) => id))
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Select onValueChange={field.onChange} {...field} >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Designers">Designers</SelectItem>
                        <SelectItem value="Developers">Developers</SelectItem>
                        <SelectItem value="Programmers">Programmers</SelectItem>
                        <SelectItem value="Technician">Technician</SelectItem>
                        <SelectItem value="Frontend">Frontend</SelectItem>
                        <SelectItem value="Backend">Backend</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button className="flex gap-2 justify-center items-center" type="submit" disabled={isSubmitting}>
                {team ?
                  "Update Team" :
                  "Submit New Team"
                }
                {isSubmitting && <Spinner />}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TeamForm;
