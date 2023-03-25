#!/usr/bin/env node

import { entry } from "./entry/entry";
import { logger } from "./util/logger";

logger.mark1('* * * * start charon1212-starter * * * *');

entry().finally(() => logger.mark1('* * * * end charon1212-starter * * * *'));
