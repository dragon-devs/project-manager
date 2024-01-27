"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import {allowedFrameworks, projectSchema} from "@/app/validationSchema";
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

export function ProfileForm() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      framework: "",
    },
  })
  const [date, setDate] = useState<Date>()
  const [isSubmiting, setIsSubmiting] = useState(false);


  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof projectSchema>) {
    try {
      setIsSubmiting(true)
      await axios.post('/api/projects', data);
      toast.success('issue is successfully created.');

      router.push('/projects')
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
          <CardTitle>Create project</CardTitle>
          <CardDescription>Include a new project in your roster.</CardDescription>
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
                    name="framework"
                    render={({field}) => (
                        <FormItem>
                          <FormLabel>Framework</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a framework"/>
                              </SelectTrigger>
                              <SelectContent>
                                {allowedFrameworks.map((framework) => (
                                    <SelectItem key={framework} value={framework}>
                                      {framework}
                                    </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
                                  <SelectItem value="0">Today</SelectItem>
                                  <SelectItem value="1">Tomorrow</SelectItem>
                                  <SelectItem value="3">In 3 days</SelectItem>
                                  <SelectItem value="7">In a week</SelectItem>
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
                                    disabled={(date) => date < new Date()}
                                />
                              </div>
                            </PopoverContent>
                          </Popover>
                          <FormMessage/>
                        </FormItem>
                    )}
                />
              </div>
              <Button className="w-full" type="submit">Add New Project</Button>
            </form>
          </Form>
        </CardContent>

      </Card>

  )

}
