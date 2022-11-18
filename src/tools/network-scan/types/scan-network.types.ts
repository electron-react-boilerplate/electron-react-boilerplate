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
