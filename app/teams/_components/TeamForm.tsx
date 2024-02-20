'use client';

import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {teamsSchema} from "@/app/validationSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "@radix-ui/react-icons";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import axios from "axios";
import {toast} from "sonner";
import {Textarea} from "@/components/ui/textarea";
import {FancyMemberSelect} from "@/app/teams/_components/FancyMembersSelect";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import Spinner from "@/components/Spinner";
import {Users, Teams} from "@/types";
import {PencilIcon} from "lucide-react";

const TeamForm = ({team, users}: { team?: Teams, users: Users[] }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof teamsSchema>>({
    resolver: zodResolver(teamsSchema),

    defaultValues: {
      name: team?.name || '',
      description: team?.description || '',
      industry: team?.industry || '',
      rating: '5.0' || '',
    }
  })
  const [isSubmiting, setIsSubmiting] = useState(false);

  async function onSubmit(data: z.infer<typeof teamsSchema>) {
    try {
      if (team) {
        console.log(team)
        await axios.patch('/api/teams/' + team.id, data)
        toast.success('Team is successfully updated.');
      } else {
        await axios.post('/api/teams', data)
        toast.success('Team is successfully created.');
      }

      router.push('/teams')
      router.refresh()
      setIsSubmiting(false)

      form.reset();
    } catch (error) {
      setIsSubmiting(false)
      toast.error('An unexpected error occurred.');
    }

  }

  const handleEdit = () => {
    console.log(team!.name)
  }

  return (
      <Dialog>
        <DialogTrigger asChild>
          {team ?
              <Button onClick={handleEdit} variant="outline"><PencilIcon/></Button> :
              <Button>New Team <PlusIcon/></Button>
          }
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            {team ?
                <DialogTitle>Edit Team</DialogTitle> :
                <DialogTitle>Create New Team</DialogTitle>
            }
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                  control={form.control}
                  name="name"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name of your team" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="description"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea className="h-20" placeholder="Description of your project" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="members"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Members</FormLabel>
                        <FormControl>
                          <FancyMemberSelect
                              team={team}
                              users={users}
                              onChange={(selected) => {
                                field.onChange(selected.map(({id}) => id))
                              }
                              }
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="industry"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select onValueChange={field.onChange} {...field} >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an industry"/>
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
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <DialogFooter>
                <Button className="flex gap-2 justify-center items-center" type="submit" disabled={isSubmiting}>
                  {team ?
                      "Update Team" :
                      "Submit New Team"
                  }
                  {isSubmiting && <Spinner/>}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
  );
};

export default TeamForm;
