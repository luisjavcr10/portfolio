import styles from './Skills.module.scss';

import { NextjsIcon } from '@/components/Shared/Icons/Frontend/NextJsIcon';
import { ReactIcon } from '@/components/Shared/Icons/Frontend/ReactJsIcon';
import { TailwindCSSIcon } from '@/components/Shared/Icons/Frontend/TailwindCSSIcon';
import { BootstrapIcon } from '@/components/Shared/Icons/Frontend/BootStrapIcon';
import { NodeJsIcon } from '@/components/Shared/Icons/BackEnd/NodeJsIcon';
import { ExpressJsIcon } from '@/components/Shared/Icons/BackEnd/ExpressJsIcon';
import { GraphQLIcon } from '@/components/Shared/Icons/BackEnd/GraphQLIcon';
import { RestAPIIcon } from '@/components/Shared/Icons/BackEnd/RestAPIIcon';
import { JavaScriptIcon } from '@/components/Shared/Icons/Languages/JavascriptIcon';
import { TypeScriptIcon } from '@/components/Shared/Icons/Languages/TypeScriptIcon';
import { HTML5Icon } from '@/components/Shared/Icons/Languages/HTMLICon';
import { SassIcon } from '@/components/Shared/Icons/Languages/SassIcon';
import { MySQLIcon } from '@/components/Shared/Icons/DataBases/MySQLIcon';
import { SQLServerIcon } from '@/components/Shared/Icons/DataBases/SQLServerIcon';
import { PostgreSQLIcon } from '@/components/Shared/Icons/DataBases/PostgreSQLIcon';
import { MongoDBIcon } from '@/components/Shared/Icons/DataBases/MongoDBIcon';
import { GitIcon } from '@/components/Shared/Icons/Tools/GitIcon';
import { GithubIcon } from '@/components/Shared/Icons/Tools/GithubIcon';
import { DockerIcon } from '@/components/Shared/Icons/Tools/DockerIcon';
import { PostmanIcon } from '@/components/Shared/Icons/Tools/PostmanIcon';

const iconsFrontend = [
    { svg: <NextjsIcon className={styles.Skills__IconList}/> , name: 'Next.js'},
    { svg: <ReactIcon className={styles.Skills__IconList}/> , name: 'React.js'},
    { svg: <TailwindCSSIcon className={styles.Skills__IconList}/> , name: 'TailwindCSS'},
    { svg: <BootstrapIcon className={styles.Skills__IconList}/> , name: 'Bootstrap'},
];

const iconsBackend = [
    { svg: <NodeJsIcon className={styles.Skills__IconList}/> , name: 'Node.js'},
    { svg: <ExpressJsIcon className={styles.Skills__IconList}/> , name: 'Express.js'},
    { svg: <GraphQLIcon className={styles.Skills__IconList}/> , name: 'GraphQL'},
    { svg: <RestAPIIcon /> , name: 'RestAPI'},
];

const iconsLanguages = [
    { svg: <JavaScriptIcon className={styles.Skills__IconList}/> , name: 'JavaScript'},
    { svg: <TypeScriptIcon className={styles.Skills__IconList}/> , name: 'TypeScript'},
    { svg: <SassIcon className={styles.Skills__IconList}/> , name: 'Sass'},
    { svg: <HTML5Icon className={styles.Skills__IconList}/> , name: 'HTML5'},
];

const iconsDataBases = [
    { svg: <MySQLIcon className={styles.Skills__IconList}/> , name: 'MySQL'},
    { svg: <SQLServerIcon className={styles.Skills__IconList}/> , name: 'SQLServer'},
    { svg: <PostgreSQLIcon className={styles.Skills__IconList}/> , name: 'PostgreSQL'},
    { svg: <MongoDBIcon className={styles.Skills__IconList}/> , name: 'MongoDB'},
];

const iconTools = [
    { svg: <GitIcon className={styles.Skills__IconList}/> , name: 'Git'},
    { svg: <GithubIcon className={styles.Skills__IconList}/> , name: 'Github'},
    { svg: <PostmanIcon className={styles.Skills__IconList}/> , name: 'Postman'},
    { svg: <DockerIcon className={styles.Skills__IconList}/> , name: 'Docker'},
];

export {iconTools,iconsBackend,iconsDataBases,iconsFrontend,iconsLanguages};