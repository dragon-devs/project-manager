"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import {projectSchema} from "@/app/validationSchema";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";
import {CalendarIcon} from "@radix-ui/react-icons";
import {useState} from "react";
import {addDays, format} from "date-fns"
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from "sonner";
import {FancyMultiSelect} from "@/components/MultiSelect";
import {Project} from "@prisma/client";
import Spinner from "@/components/Spinner";

export function ProjectForm({project}: { project?: Project }) {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name ?? '',
      description: project?.description ?? '',
      frameworks: project?.frameworks ?? [],
      timeline: project?.timeline,
      budget: project?.budget ?? '',
      dueDate: project?.dueDate,
    }
  })
  const [date, setDate] = useState<Date>()
  const [isSubmiting, setIsSubmiting] = useState(false);


  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof projectSchema>) {
    try {
      setIsSubmiting(true)
      if (project) {
        await axios.patch('/api/projects/' + project.id, data)
        toast.success('Project is successfully updated.');
      } else {
        await axios.post('/api/projects', data)
        toast.success('Project is successfully created.');
      }
      router.push('/projects/grid')
      router.refresh()
      setIsSubmiting(false)
    } catch (error) {
      setIsSubmiting(false)
      toast.error('An unexpected error occurred.');
    }
  }

  return (
      <Card>
        <CardHeader>
          <CardTitle>{project ? "Update Project" : "Create new project"}</CardTitle>
          <CardDescription>{project ? "Incorporate the latest updates to your project roster." : "Include a new project in your roster."} </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                  control={form.control}
                  name="name"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name of your project" {...field} />
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
                          <Textarea className="h-32" placeholder="Description of your project" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                    control={form.control}
                    name="frameworks"
                    render={({field}) => (
                        <FormItem>
                          <FormLabel>Frameworks</FormLabel>
                          <FormControl>
                            <FancyMultiSelect
                                project={project!}
                                onChange={(values) => {
                                  field.onChange(values.map(({value}) => value));
                                }}
                            />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dueDate"
                    render={({field}) => (
                        <FormItem className="flex gap-1.5 flex-col">
                          <FormLabel>Due Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                  {field.value ? (
                                      format(field.value, "PPP")
                                  ) : (
                                      <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
                              <Select
                                  onValueChange={(value) => {
                                    // Calculate the future date based on the selected option
                                    const daysToAdd = parseInt(value);
                                    const newDate = addDays(new Date(), daysToAdd);
                                    setDate(newDate);
                                    field.onChange(newDate); // Update the form field with the selected date

                                  }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select"/>
                                </SelectTrigger>
                                <SelectContent position="popper">
                                  <SelectItem value="1">Tomorrow</SelectItem>
                                  <SelectItem value="3">In 3 days</SelectItem>
                                  <SelectItem value="7">In a week</SelectItem>
                                  <SelectItem value="14">2 a weeks</SelectItem>
                                  <SelectItem value="30">A month</SelectItem>
                                </SelectContent>
                              </Select>
                              <div className="rounded-md border">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(newDate) => {
                                      setDate(newDate);
                                      field.onChange(newDate);
                                    }}
                                    disabled={(date) => date <= new Date()}
                                />
                              </div>
                            </PopoverContent>
                          </Popover>
                          <FormMessage/>
                        </FormItem>
                    )}
                />
              </div>
              <FormField
                  control={form.control}
                  name="budget"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Budget</FormLabel>
                        <FormControl>
                          <Input placeholder="Project budget" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <Button className="w-full gap-2" type="submit" disabled={isSubmiting}>
                {project ? "Update Project" : "Submit New Project"}{" "}
                {isSubmiting && <Spinner/>}
              </Button>
            </form>
          </Form>
        </CardContent>

      </Card>

  )

}
