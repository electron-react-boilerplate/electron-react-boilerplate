export interface ITcpScan {
  nmaprun: {
    scaninfo: {
      $: {
        type: string;
        protocol: string;
        numervices: string;
        services: string;
      };
    }[];
    host: {
      address: {
        $: {
          addr: string;
          addrtype: string;
        };
      }[];
      status: {
        $: {
          state: string;
        };
      }[];
      hostnames: {
        hostname: {
          $: {
            name: string;
          };
        }[];
      }[];
      ports: {
        port: {
          state: {
            $: {
              state: string;
            };
          }[];
          $: {
            protocol: string;
            portid: string;
          };
          service: {
            $: {
              name: string;
              product: string;
              devicetype: string;
              ostype: string;
              extrainfo: string;
            };
          }[];
        }[];
      }[];
    }[];
  };
}
export enum ScanTypeSelect {
  services = '-sV',
  ipProtocol = '-sO',
  UDP = '-sU',
  stealthScan = '-sS',
  operationalSystem = '-O',
  OSVersionTraceroute = '-A',
}

export enum ScriptSelect {
  default = '-sC',
  auth = 'auth',
  broadcast = 'broadcast',
  privacy = 'privacy',
  discovery = 'discovery',
  dos = 'dos',
  exploit = 'exploit',
  brute = 'brute',
  fuzzer = 'fuzzer',
  malware = 'malware',
  vuln = 'vuln',
  version = 'version', // just run with -sV
}
