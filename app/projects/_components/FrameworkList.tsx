import React from 'react';
import {
  AngularjsPlain,
  CplusplusPlain, CsharpPlain, DartPlain,
  DeviconsReactOriginal,
  DjangoPlain, DotnetcorePlain, DotNetPlain, FastapiOriginal,
  FastapiPlain, FlaskOriginal, GoPlain, JavaPlain, JavascriptPlain, KotlinPlain,
  NextjsLine,
  NodejsPlain, PhpPlain,
  PythonPlain,
  ReactOriginal, RubyPlain, RustPlain, SwiftPlain, TypescriptPlain, VuejsLine, VuejsOriginal, VuejsPlain
} from "devicons-react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

interface Framework {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const allFrameworks: Framework[] = [
  {value: 'REACTJS', label: 'React.js', icon: <ReactOriginal size={23} color="slategrey"/>},
  {value: 'NODEJS', label: 'Node.js', icon: <NodejsPlain size={23} color="slategrey"/>},
  {value: 'RESTAPI', label: 'REST API', icon: <FastapiPlain size={23} color="slategrey"/>},
  {value: 'NEXTJS', label: 'Next.js', icon: <NextjsLine size={23} color="slategrey"/>},
  {value: 'PYTHON', label: 'Python', icon: <PythonPlain size={23} color="slategrey"/>},
  {value: 'DJANGO', label: 'Django', icon: <DjangoPlain size={23} color="slategrey"/>},
  {value: 'FLASK', label: 'Flask', icon: <FlaskOriginal size={23} color="slategrey"/>},
  {value: 'FASTAPI', label: 'FastAPI', icon: <FastapiOriginal size={23} color="slategrey"/>},
  {value: 'ASPDOTNET', label: 'ASP.NET', icon: <DotNetPlain size={23} color="slategrey"/>},
  {value: 'TYPESCRIPT', label: 'TypeScript', icon: <TypescriptPlain size={23} color="slategrey"/>},
  {value: 'JAVASCRIPT', label: 'JavaScript', icon: <JavascriptPlain size={23} color="slategrey"/>},
  {value: 'CPLUSPLUS', label: 'C++', icon: <CplusplusPlain size={23} color="slategrey"/>},
  {value: 'CSHARP', label: 'C#', icon: <CsharpPlain size={23} color="slategrey"/>},
  {value: 'RUST', label: 'Rust', icon: <RustPlain size={23} color="slategrey"/>},
  {value: 'JAVA', label: 'Java', icon: <JavaPlain size={23} color="slategrey"/>},
  {value: 'PHP', label: 'PHP', icon: <PhpPlain size={23} color="slategrey"/>},
  {value: 'RUBY', label: 'Ruby', icon: <RubyPlain size={23} color="slategrey"/>},
  {value: 'GOLANG', label: 'Go', icon: <GoPlain size={23} color="slategrey"/>},
  {value: 'SWIFT', label: 'Swift', icon: <SwiftPlain size={23} color="slategrey"/>},
  {value: 'KOTLIN', label: 'Kotlin', icon: <KotlinPlain size={23} color="slategrey"/>},
  {value: 'DART', label: 'Dart', icon: <DartPlain size={23} color="slategrey"/>},
  {value: 'ANGULAR', label: 'Angular', icon: <AngularjsPlain size={23} color="slategrey"/>},
  {value: 'VUE', label: 'Vue.js', icon: <VuejsOriginal size={23} color="slategrey"/>},
  {value: 'DOTNET', label: '.NET', icon: <DotnetcorePlain size={23} color="slategrey"/>},
];

interface FrameworkProps {
  frameworks: string[];
}

const FrameworkList: React.FC<FrameworkProps> = ({ frameworks }) => {
  // Filter the list of allFrameworks based on the provided values
  const filteredFrameworks: Framework[] = allFrameworks.filter((framework) =>
    frameworks.includes(framework.value)
  );

  return (
    <div className="framework-list">
      <div className="flex -space-x-1 overflow-hidden">
        {filteredFrameworks.map((framework) => (
          <TooltipProvider key={framework.value}>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className="flex items-center justify-center bg-foreground w-8 h-8 items-center rounded-full ring-2 ring-background"
                >
                  {framework.icon}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{framework.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default FrameworkList;