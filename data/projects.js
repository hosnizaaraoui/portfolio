/* ---------- PROJECT DATA (single source of truth) ---------- */
window.PROJECTS = {

    cove: {
        name: 'COVE',
        slug: 'cove',
        status: 'in development',
        statusClass: 'dev',
        shortDesc:
            'Local-first CVE intelligence dashboard aggregating vulnerability info from multiple security sources into a unified interface.',
        description:
            'A local-first CVE intelligence dashboard that aggregates vulnerability information from multiple security sources into a unified interface.',
        problem:
            'Vulnerability information is scattered across multiple sources, making it difficult to collect, normalize, and compare in one place without depending entirely on a single external provider.',
        goal:
            'Make vulnerability information easier to collect, normalize, compare, and review locally.',
        architecture:
            'Local-first design with SQLite storage and a Textual TUI front-end, integrating multiple external security data sources through REST APIs with local caching and deduplication.',
        technologies: ['Python', 'SQLite', 'Textual TUI', 'REST'],
        techFull: ['NVD', 'CISA KEV', 'GitHub Security Advisories', 'SQLite', 'Python', 'Textual TUI', 'REST APIs'],
        features: [
            'Aggregates multiple vulnerability sources',
            'Deduplication across sources',
            'Vulnerability filtering',
            'Local caching for offline review'
        ],
        learnings:
            'Working with multiple security APIs, normalizing heterogeneous data, and designing a local-first tool.',
        github: 'https://github.com/hosnizaaraoui/COVE'
    },

    stayzer: {
        name: 'STAYZER',
        slug: 'stayzer',
        status: 'active development',
        statusClass: 'active',
        shortDesc:
            'SSH trust analyzer that examines authorized SSH keys across multiple Linux systems to identify unexpected or risky trust relationships.',
        description:
            'An SSH trust analyzer that examines authorized SSH keys across multiple Linux systems to identify unexpected or risky trust relationships.',
        problem:
            'SSH trust relationships can grow silently across hosts. Duplicate or unexpected keys create risk that is hard to spot manually.',
        goal:
            'Analyze SSH authorized_keys across multiple hosts and surface duplicate or risky trust relationships with severity classification.',
        architecture:
            'Python with AsyncSSH to inspect multiple hosts concurrently, comparing fingerprints and classifying findings by severity.',
        technologies: ['Python', 'AsyncSSH', 'SSH', 'Docker'],
        techFull: ['Python', 'AsyncSSH', 'SSH', 'ssh-keygen', 'Docker'],
        features: [
            'Multi-host analysis',
            'SSH authorized_keys inspection',
            'Fingerprint comparison',
            'Duplicate key detection',
            'Trust relationship analysis',
            'Severity classification'
        ],
        learnings:
            'Async SSH operations, key fingerprinting, and reasoning about trust relationships at scale.',
        github: 'https://github.com/hosnizaaraoui/STAYZER'
    },

    pexa: {
        name: 'PEXA',
        slug: 'pexa',
        status: 'completed',
        statusClass: 'done',
        shortDesc:
            'Python-based Linux auditing tool for identifying human user accounts with expired or soon-to-expire passwords.',
        description:
            'A Python-based Linux auditing tool for identifying human user accounts with expired or soon-to-expire passwords.',
        problem:
            'On Linux systems it is easy to miss accounts whose passwords are expired or about to expire, especially across multiple hosts.',
        goal:
            'Identify human user accounts with expired or soon-to-expire passwords and produce clear reports.',
        architecture:
            'Python tool that audits locally or over SSH, filters human users, analyzes password expiration via chage, and outputs JSON, HTML, and console reports.',
        technologies: ['Python', 'Linux', 'SSH', 'chage'],
        techFull: ['Python', 'SSH', 'Linux', 'chage', 'JSON', 'HTML'],
        features: [
            'Local and SSH-based auditing',
            'Human-user filtering',
            'Password expiration analysis',
            'User exclusions',
            'Days-to-expiration filtering',
            'JSON and HTML reports',
            'Console output'
        ],
        learnings:
            'Linux account management, chage parsing, and building multi-format reporting.',
        github: 'https://github.com/hosnizaaraoui/PEXA'
    },

    pentorax: {
        name: 'PentoraX',
        slug: 'pentorax',
        status: 'completed',
        statusClass: 'done',
        shortDesc:
            'Modular security assessment toolkit designed to automate and organize common reconnaissance and security testing tasks.',
        description:
            'A modular security assessment toolkit designed to automate and organize multiple reconnaissance and security testing tasks into a structured workflow.',
        problem:
            'Security assessment workflows often require running multiple tools manually and organizing their results across different stages of an assessment.',
        goal:
            'Provide a structured toolkit that automates common security assessment tasks while keeping the workflow modular and easy to extend.',
        architecture:
            'Modular Python-based architecture where user-defined targets are processed through sequential security assessment modules, with results organized for later analysis.',
        technologies: ['Python', 'Linux', 'Networking', 'Security Tools', 'Automation'],
        techFull: ['Python', 'Linux', 'Networking', 'Reconnaissance', 'Security Testing', 'Automation'],
        features: [
            'Modular assessment workflow',
            'Automated reconnaissance',
            'Target-based execution',
            'Sequential security modules',
            'Structured output',
            'Extensible architecture'
        ],
        learnings:
            'Security assessment workflows, Python automation, modular architecture, and integrating multiple security tools.'
    },

    'proxmox-ha': {
        name: 'Proxmox High Availability Cluster',
        slug: 'proxmox-ha',
        status: 'completed',
        statusClass: 'done',
        shortDesc:
            'Multi-node Proxmox virtualization lab exploring clustering, virtual machine management, and high availability.',
        description:
            'A Proxmox virtualization lab built to explore clustering, virtual machine management, and high availability.',
        problem:
            'Understanding virtualization and high availability requires working with multiple nodes and observing how virtual machines and resources behave within a cluster.',
        goal:
            'Build a multi-node Proxmox environment and explore virtual machine management, clustering, and high-availability concepts.',
        architecture:
            'A Proxmox cluster hosting three virtual machines, configured to experiment with cluster management and high availability.',
        technologies: ['Proxmox', 'Linux', 'Virtual Machines'],
        techFull: ['Proxmox', 'Linux', 'Virtual Machines', 'High Availability', 'Clustering'],
        features: [
            'Multi-node Proxmox cluster',
            'Virtual machine management',
            'Cluster configuration',
            'High availability configuration',
            'Infrastructure troubleshooting'
        ],
        learnings:
            'Virtualization infrastructure, cluster management, resource handling, and high-availability concepts.'
    },

    'vision-bio': {
        name: 'VISION BIO Network Infrastructure',
        slug: 'vision-bio',
        status: 'completed',
        statusClass: 'done',
        shortDesc:
            'Simulated enterprise network infrastructure designed with GNS3 and pfSense for departmental segmentation and network services.',
        description:
            'A simulated enterprise network infrastructure designed and configured with GNS3 and pfSense for departmental segmentation and network services.',
        problem:
            'Organizations need to isolate departments and services while maintaining controlled communication and centralized network management.',
        goal:
            'Design a segmented enterprise network with dedicated VLANs, firewall policies, VPN access, VoIP, and management infrastructure.',
        architecture:
            'GNS3-based network topology using pfSense as the firewall and routing platform, with separate VLANs for Administration, Sales, Marketing, R&D, VPN, VoIP, and Management.',
        technologies: ['GNS3', 'pfSense', 'VLANs', 'Routing'],
        techFull: ['GNS3', 'pfSense', 'VLANs', 'VPN', 'VoIP', 'Routing', 'Firewall'],
        features: [
            'Departmental VLAN segmentation',
            'Inter-VLAN routing',
            'Firewall configuration',
            'VPN network',
            'VoIP network',
            'Dedicated management network'
        ],
        learnings:
            'Enterprise network design, VLAN segmentation, routing, firewall policies, and network troubleshooting.'
    },

    'security-monitoring': {
        name: 'Linux Security Monitoring Pipeline',
        slug: 'security-monitoring',
        status: 'completed',
        statusClass: 'done',
        shortDesc:
            'Linux security monitoring pipeline connecting Suricata, rsyslog, and Graylog for centralized security event collection and visualization.',
        description:
            'A Linux-based security monitoring pipeline connecting Suricata, rsyslog, and Graylog to collect, transport, and visualize security events.',
        problem:
            'Security events generated by individual systems are difficult to monitor efficiently without centralized collection and visualization.',
        goal:
            'Build a centralized monitoring pipeline capable of collecting security events and presenting them through a unified dashboard.',
        architecture:
            'Suricata generates security events on Ubuntu 18, rsyslog transports the logs, and Graylog on Ubuntu 22 provides centralized processing and visualization.',
        technologies: ['Suricata', 'rsyslog', 'Graylog', 'Ubuntu'],
        techFull: ['Ubuntu 18', 'Ubuntu 22', 'Suricata', 'rsyslog', 'Graylog', 'SIEM'],
        features: [
            'Network security monitoring',
            'Log collection',
            'Centralized log processing',
            'Security event visualization',
            'Graylog dashboard'
        ],
        learnings:
            'Security monitoring pipelines, log management, centralized event collection, and SIEM concepts.'
    },

    'proxmox-pfsense-automation': {
        name: 'Proxmox & pfSense Automation',
        slug: 'proxmox-pfsense-automation',
        status: 'completed',
        statusClass: 'done',
        shortDesc:
            'Ansible automation project for managing Proxmox infrastructure and pfSense virtual machines through APIs.',
        description:
            'An Ansible automation project for managing Proxmox infrastructure and pfSense virtual machines through APIs.',
        problem:
            'Manually creating, cloning, updating, and deleting infrastructure resources becomes repetitive and error-prone as environments grow.',
        goal:
            'Automate common Proxmox and pfSense virtual machine lifecycle operations using Ansible and API-based management.',
        architecture:
            'Ansible playbooks communicate with the Proxmox cluster and pfSense environment through their APIs to perform configurable infrastructure operations.',
        technologies: ['Ansible', 'Proxmox', 'pfSense', 'REST'],
        techFull: ['Ansible', 'Proxmox', 'pfSense', 'REST API', 'YAML', 'Linux'],
        features: [
            'Virtual machine creation',
            'Template cloning',
            'Virtual machine updates',
            'Virtual machine deletion',
            'Configurable deployment variables',
            'API-based infrastructure management'
        ],
        learnings:
            'Infrastructure automation, Ansible playbook design, REST APIs, virtualization management, and Infrastructure as Code concepts.'
    }

};
