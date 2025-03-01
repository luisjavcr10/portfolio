import styles from './Skills.module.scss';

import { NextjsIcon } from '@/utils/Icons/Frontend/NextJsIcon';
import { ReactIcon } from '@/utils/Icons/Frontend/ReactJsIcon';
import { TailwindCSSIcon } from '@/utils/Icons/Frontend/TailwindCSSIcon/TailwindCSSIcon';
import { BootstrapIcon } from '@/utils/Icons/Frontend/BootStrapIcon';
import { NodeJsIcon } from '@/utils/Icons/BackEnd/NodeJsIcon';
import { ExpressJsIcon } from '@/utils/Icons/BackEnd/ExpressJsIcon';
import { SpringIcon } from '@/utils/Icons/BackEnd/SpringIcon';
import { GraphQLIcon } from '@/utils/Icons/BackEnd/GraphQLIcon';
import { RestAPIIcon } from '@/utils/Icons/BackEnd/RestAPIIcon';
import { JavaScriptIcon } from '@/utils/Icons/Languages/JavascriptIcon';
import { TypeScriptIcon } from '@/utils/Icons/Languages/TypeScriptIcon';
import { JavaIcon } from '@/utils/Icons/Languages/JavaIcon';
import { HTML5Icon } from '@/utils/Icons/Languages/HTMLICon';
import { CSSIcon } from '@/utils/Icons/Languages/CSSIcon';
import { SassIcon } from '@/utils/Icons/Languages/SassIcon';
import { MySQLIcon } from '@/utils/Icons/DataBases/MySQLIcon';
import { SQLServerIcon } from '@/utils/Icons/DataBases/SQLServerIcon';
import { PostgreSQLIcon } from '@/utils/Icons/DataBases/PostgreSQLIcon';
import { MongoDBIcon } from '@/utils/Icons/DataBases/MongoDBIcon';
import { GitIcon } from '@/utils/Icons/Tools/GitIcon';
import { GithubIcon } from '@/utils/Icons/Tools/GithubIcon';
import { DockerIcon } from '@/utils/Icons/Tools/DockerIcon';
import { PostmanIcon } from '@/utils/Icons/Tools/PostmanIcon';
import { SwaggerIcon } from '@/utils/Icons/Tools/SwaggerIcon';
import { VercelIcon } from '@/utils/Icons/Tools/VercelIcon';

const iconsFrontend = [
    { svg: <NextjsIcon className={styles.Skills__IconList}/> , name: 'Next.js'},
    { svg: <ReactIcon className={styles.Skills__IconList}/> , name: 'React.js'},
    { svg: <TailwindCSSIcon className={styles.Skills__IconList}/> , name: 'TailwindCSS'},
    { svg: <BootstrapIcon className={styles.Skills__IconList}/> , name: 'Bootstrap'},
];

const iconsBackend = [
    { svg: <NodeJsIcon className={styles.Skills__IconList}/> , name: 'Node.js'},
    { svg: <ExpressJsIcon className={styles.Skills__IconList}/> , name: 'Express.js'},
    { svg: <SpringIcon className={styles.Skills__IconList}/> , name: 'Spring'},
    { svg: <GraphQLIcon className={styles.Skills__IconList}/> , name: 'GraphQL'},
    { svg: <RestAPIIcon /> , name: 'RestAPI'},
];

const iconsLanguages = [
    { svg: <JavaScriptIcon className={styles.Skills__IconList}/> , name: 'JavaScript'},
    { svg: <TypeScriptIcon className={styles.Skills__IconList}/> , name: 'TypeScript'},
    { svg: <JavaIcon className={styles.Skills__IconList}/> , name: 'Java'},
    { svg: <HTML5Icon className={styles.Skills__IconList}/> , name: 'HTML5'},
    { svg: <CSSIcon className={styles.Skills__IconList}/> , name: 'CSS'},
    { svg: <SassIcon className={styles.Skills__IconList}/> , name: 'Sass'},
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
    { svg: <SwaggerIcon className={styles.Skills__IconList}/> , name: 'Swagger'},
    { svg: <VercelIcon className={styles.Skills__IconList}/> , name: 'Vercel'},
];

export {iconTools,iconsBackend,iconsDataBases,iconsFrontend,iconsLanguages};