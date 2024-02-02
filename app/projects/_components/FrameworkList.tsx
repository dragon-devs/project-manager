import React from 'react';
import {
  AmazonwebservicesPlainWordmark,
  AngularjsPlain, AnsiblePlain, AzurePlain, BashPlain, CPlain,
  CplusplusPlain,
  CsharpPlain,
  Css3Plain,
  DartPlain,
  DjangoPlain, DockerPlainWordmark,
  DotnetcorePlain,
  DotNetPlain, ExpressOriginal,
  FastapiOriginal,
  FastapiPlain,
  FlaskOriginal, FlutterPlain, GitlabPlainWordmark, GooglecloudPlain,
  GoPlain, GrafanaOriginal,
  Html5Plain,
  JavaPlain,
  JavascriptPlain, JenkinsPlain, JqueryPlain, JqueryPlainWordmark,
  KotlinPlain, KubernetesPlainWordmark, LaravelPlain,
  MicrosoftsqlserverPlain,
  MicrosoftsqlserverPlainWordmark,
  MongodbPlain,
  MongodbPlainWordmark,
  MysqlPlain,
  MysqlPlainWordmark,
  NextjsLine,
  NodejsPlain, PerlPlain,
  PhpPlain, PostgresqlPlainWordmark, PrometheusOriginal,
  PythonPlain,
  ReactOriginal, ReactOriginalWordmark, RPlain,
  RubyPlain,
  RustPlain, SeleniumOriginal, SpringPlain, SqlalchemyOriginalWordmark,
  SqlalchemyPlain, SqlitePlainWordmark,
  SwiftPlain, SwiftPlainWordmark,
  TypescriptPlain,
  VuejsOriginal
} from "devicons-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {GitHubLogoIcon} from "@radix-ui/react-icons";

interface Framework {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const allFrameworks: Framework[] = [
  {value: 'REACTJS', label: 'React.js', icon: <ReactOriginalWordmark size={15} color="slategrey"/>},
  {value: 'NODEJS', label: 'Node.js', icon: <NodejsPlain size={15} color="slategrey"/>},
  {value: 'NEXTJS', label: 'Next.js', icon: <NextjsLine size={15} color="slategrey"/>},
  {value: 'PYTHON', label: 'Python', icon: <PythonPlain size={15} color="slategrey"/>},
  {value: 'DJANGO', label: 'Django', icon: <DjangoPlain size={15} color="slategrey"/>},
  {value: 'FLASK', label: 'Flask', icon: <FlaskOriginal size={15} color="slategrey"/>},
  {value: 'FASTAPI', label: 'FastAPI', icon: <FastapiOriginal size={15} color="slategrey"/>},
  {value: 'ASPDOTNET', label: 'ASP.NET', icon: <DotNetPlain size={15} color="slategrey"/>},
  {value: 'TYPESCRIPT', label: 'TypeScript', icon: <TypescriptPlain size={15} color="slategrey"/>},
  {value: 'JAVASCRIPT', label: 'JavaScript', icon: <JavascriptPlain size={15} color="slategrey"/>},
  {value: 'CPLUSPLUS', label: 'C++', icon: <CplusplusPlain size={15} color="slategrey"/>},
  {value: 'CSHARP', label: 'C#', icon: <CsharpPlain size={15} color="slategrey"/>},
  {value: 'RUST', label: 'Rust', icon: <RustPlain size={15} color="slategrey"/>},
  {value: 'JAVA', label: 'Java', icon: <JavaPlain size={15} color="slategrey"/>},
  {value: 'PHP', label: 'PHP', icon: <PhpPlain size={15} color="slategrey"/>},
  {value: 'RUBY', label: 'Ruby', icon: <RubyPlain size={15} color="slategrey"/>},
  {value: 'GOLANG', label: 'Go', icon: <GoPlain size={15} color="slategrey"/>},
  {value: 'SWIFT', label: 'Swift', icon: <SwiftPlain size={15} color="slategrey"/>},
  {value: 'KOTLIN', label: 'Kotlin', icon: <KotlinPlain size={15} color="slategrey"/>},
  {value: 'DART', label: 'Dart', icon: <DartPlain size={15} color="slategrey"/>},
  {value: 'ANGULAR', label: 'Angular', icon: <AngularjsPlain size={15} color="slategrey"/>},
  {value: 'VUEJS', label: 'Vue.js', icon: <VuejsOriginal size={15} color="slategrey"/>},
  {value: 'DOTNET', label: '.NET', icon: <DotnetcorePlain size={15} color="slategrey"/>},
  {value: 'GITHUB', label: 'Github', icon: <GitHubLogoIcon color="slategrey"/>},
  {value: 'HTML', label: 'HTML5', icon: <Html5Plain size={15} color="slategrey"/>},
  {value: 'CSS', label: 'CSS3', icon: <Css3Plain size={15} color="slategrey"/>},
  {value: 'SQL', label: 'SQL', icon: <MicrosoftsqlserverPlainWordmark size={15} color="slategrey"/>},
  {value: 'MYSQL', label: 'Mysql', icon: <MysqlPlainWordmark size={15} color="slategrey"/>},
  {value: 'POSTGRESQL', label: 'Postgresql', icon: <PostgresqlPlainWordmark size={15} color="slategrey"/>},
  {value: 'SQLITE', label: 'Sqlite', icon: <SqlitePlainWordmark size={15} color="slategrey"/>},
  {value: 'SQLALCHEMY', label: 'Sqlalchemy', icon: <SqlalchemyOriginalWordmark size={15} color="slategrey"/>},
  {value: 'MONGODB', label: 'MongoDB', icon: <MongodbPlainWordmark size={15} color="slategrey"/>},
  {value: 'C', label: 'C', icon: <CPlain size={15} color="slategrey"/>},
  {value: 'R', label: 'R', icon: <RPlain size={15} color="slategrey"/>},
  {value: 'SWIFTUI', label: 'SwiftUi', icon: <SwiftPlainWordmark size={15} color="slategrey"/>},
  {value: 'BASH', label: 'Bash', icon: <BashPlain size={15} color="slategrey"/>},
  {value: 'PERL', label: 'Perl', icon: <PerlPlain size={15} color="slategrey"/>},
  {value: 'JQUERY', label: 'JQuery', icon: <JqueryPlainWordmark size={15} color="slategrey"/>},
  {value: 'SELENIUM', label: 'Selenium', icon: <SeleniumOriginal size={15} color="slategrey"/>},
  {value: 'DOCKER', label: 'Docker', icon: <DockerPlainWordmark size={15} color="slategrey"/>},
  {value: 'KUBERNETES', label: 'Kubernetes', icon: <KubernetesPlainWordmark size={15} color="slategrey"/>},
  {value: 'JENKINS', label: 'Jenkins', icon: <JenkinsPlain size={15} color="slategrey"/>},
  {value: 'GITLAB', label: 'Gitlab', icon: <GitlabPlainWordmark size={15} color="slategrey"/>},
  {value: 'ANSIBLE', label: 'Ansible', icon: <AnsiblePlain size={15} color="slategrey"/>},
  {value: 'PROMETHEUS', label: 'Prometheus', icon: <PrometheusOriginal size={15} color="slategrey"/>},
  {value: 'AWS', label: 'AmazonWebServices', icon: <AmazonwebservicesPlainWordmark  size={15} color="slategrey"/>},
  {value: 'GOOGLECLOUD', label: 'GoogleCloud', icon: <GooglecloudPlain size={15} color="slategrey"/>},
  {value: 'EXPRESSJS', label: 'ExpressJs', icon: <ExpressOriginal size={15} color="slategrey"/>},
  {value: 'SPRINGBOOT', label: 'SpringBoot', icon: <SpringPlain size={15} color="slategrey"/>},
  {value: 'LARAVEL', label: 'Laravel', icon: <LaravelPlain  size={15} color="slategrey"/>},
  {value: 'FLUTTER', label: 'Flutter', icon: <FlutterPlain  size={15} color="slategrey"/>},
  {value: 'REACTNATIVE', label: 'ReactNative', icon: <ReactOriginal  size={15} color="slategrey"/>},
];

interface FrameworkProps {
  frameworks: string[];
}

const FrameworkList: React.FC<FrameworkProps> = ({ frameworks }) => {
  // Filter the grid of allFrameworks based on the provided values
  const filteredFrameworks: Framework[] = allFrameworks.filter((framework) =>
    frameworks.includes(framework.value)
  );

  return (
    <div className="framework-list">
      <div className="flex -space-x-1 overflow-hidden">
        {filteredFrameworks.map((framework) => (
          <Popover key={framework.value}>
              <PopoverTrigger>
                <div
                  className="flex justify-center w-[1.3rem] h-[1.3rem] sm:w-6 sm:h-6 bg-foreground items-center rounded-full ring-2 ring-background"
                >
                  {framework.icon}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2 font-light text-xs">
                <p>{framework.label}</p>
              </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
};

export const FrameworkDetailsList: React.FC<FrameworkProps> = ({ frameworks }) => {
  // Filter the grid of allFrameworks based on the provided values
  const filteredFrameworks: Framework[] = allFrameworks.filter((framework) =>
    frameworks.includes(framework.value)
  );

  return (
    <div className="framework-list">
      <div className="flex flex-wrap">
        {filteredFrameworks.map((framework) => (
            <div key={framework.value} className="mr-2 font-medium">
              <p>{framework.label}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default FrameworkList;