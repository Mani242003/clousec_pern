import C_S_3 from "/C_S_1.jpg";
import C_S_2 from "/C_S_2.jpg";
import C_S_1 from "/C_S_3.jpg";
import C_S_4 from "/C_S_4.jpg";
import C_S_5 from "/C_S_5.jpg";

export interface DetailItem {
  title: string;
  content: string;
}

export interface CaseStudy {
  id: number;
  imgUrl: string;
  title: string;
  subTitle: string;
  challenges1: string;
  challenges2?: string;
  challenges3?: string;
  details: DetailItem[];
  results: DetailItem[];
}

const C_S_Data: CaseStudy[] = [
  {
    id: 1,
    imgUrl: C_S_1,
    title: "Banking & Financial Services",
    subTitle: "Enhancing Cloud Security and Compliance: How ClouSec Empowered a Global Investment Bank",
    challenges1: `A global investment bank faced significant hurdles in maintaining a secure and compliant cloud environment while rapidly scaling its workloads across multiple AWS accounts. The primary challenge stemmed from inconsistent security practices across different teams and regions, leading to gaps in cloud security.`,
    challenges2: `Additionally, the bank struggled with manual processes when addressing cloud misconfigurations. Without an automated system in place, security teams had to manually identify, prioritize, and remediate vulnerabilities, such as misconfigured access controls or publicly exposed storage buckets. This approach not only consumed valuable time and resources but also increased the risk of prolonged exposure to security threats.`,
    challenges3: `Compounding these challenges was the high compliance overhead associated with strict financial regulations like PCI-DSS and SOC standards. Ensuring continuous compliance required frequent audits, extensive reporting, and adherence to complex security frameworks, creating additional operational strain. The lack of automation in compliance management further slowed down security processes, making it difficult for the bank to maintain an always 'audit-ready' posture.`,

    details: [
      {
        title: "Centralized Security Management",
        content:
          "Provided a unified dashboard to view all security findings across hundreds of AWS accounts, making risk assessment more efficient.",
      },
      {
        title: "Automated Compliance Checks",
        content:
          "Mapped corporate controls to regulatory standards (e.g., PCI-DSS, SOC), flagging non-compliant resources in real-time.",
      },
      {
        title: "AI-Driven Remediation",
        content:
          "Reduced manual ticket assignment by auto-remediating frequent misconfigurations—like public S3 buckets—shortening time-to-fix from days to hours.",
      },
    ],
    results: [
      {
        title: "80% Reduction in Manual Effort",
        content:
          "Security teams saved time by automating common fixes, focusing on higher-level risk analysis.",
      },
      {
        title: "Improved Regulatory Readiness",
        content:
          "Real-time scanning meant the bank was always 'audit-ready,' significantly cutting compliance prep time.",
      },
      {
        title: "Enhanced Security Posture",
        content:
          "With fewer delays and auto-remediation, risk exposure windows decreased by 70%.",
      },
    ],
  },
  {
    id: 2,
    imgUrl: C_S_2,
    title: "Leading CII Industry",
    subTitle: "Streamlining User Access Audits: How ClouSec Transformed Security and Compliance for a Leading CII Organization",
    challenges1: "A leading Critical Information Infrastructure (CII) organization faced significant difficulties in conducting periodic.. audits of user access across multiple cloud accounts. The manual process of gathering, correlating, and reviewing user data was time-consuming, often taking 4–5 days to complete. This inefficiency created security gaps, as outdated or excessive permissions remained active longer than necessary, increasing the organization's attack surface.",
    challenges2: "Additionally, the lack of a centralized access governance system made it challenging to enforce uniform security policies across different cloud environments. Security teams had to manually sift through scattered access logs, leading to delays in identifying unauthorized or unnecessary privileges.",
    challenges3: "Compounding these security risks were strict regulatory requirements, demanding consistent access reviews and audit readiness. Without an automated solution, compliance efforts were burdensome, requiring extensive manual reporting and verification processes. The inability to quickly assess and remediate access risks not only compromised security but also increased the likelihood of regulatory violations, potentially leading to penalties or reputational damage.",
    
  
    details: [
      {
        title: "Automated User Governance",
        content:
          "ClouSec consolidated user inventories from different cloud accounts, mapping roles and permissions in a single dashboard.",
      },
      {
        title: "Retain/Remove Recommendations",
        content:
          "The platform used AI to suggest which user profiles to keep or remove, significantly reducing manual checks",
      },
      
    ],
    results: [
      {
        title: "Reduced Audit Time",
        content:
          "What once took nearly a week was completed in minutes, freeing the security team to focus on high-level risk management",
      },
      {
        title: "Improved Security Posture",
        content:
          "Timely detection of stale or excessive permissions led to immediate access revocations, minimizing the attack surface.",
      },
      {
        title: "Enhanced Compliance Readiness",
        content:
          "Real-time audit trails and standardized reporting simplified meeting regulatory requirements",
      },
    ],
  },
  {
    id: 3,
    imgUrl: C_S_3,
    title: "Banking Sector R&D Account",
    subTitle: "Optimizing Cloud Costs Without Compromising R&D Agility",
   challenges1:"A major banking institution faced growing concerns over unpredictable cloud costs while managing multiple R&D workloads on AWS. The dynamic nature of research and development required frequent provisioning of cloud resources, but without proper oversight, costs spiraled due to unused, underutilized, or oversized instances.",
   challenges2:"The account manager needed a scalable and efficient solution to identify cost drivers and eliminate unnecessary spending—without restricting the agility of the R&D teams. Traditional cost management approaches, relying on manual tracking and budget approvals, proved ineffective, leading to delays in resource allocation and increased cloud waste.",
   challenges3:"Additionally, balancing financial control with innovation was a critical challenge. Implementing strict cost-cutting measures risked slowing down R&D cycles, whereas allowing unrestricted cloud usage led to budget overruns. The bank required a data-driven approach to optimize spending while ensuring that developers had the resources they needed when they needed them.",
    
   
   details: [
    {
      title: "Cost Visibility & Optimization",
      content:
        "ClouSec's AI-driven analytics pinpointed unused or underutilized resources—such as dormant EC2 instances and oversized databases.",
    },
    {
      title: "Actionable Recommendations",
      content:
        " Provided real-time suggestions for rightsizing resources and opportunities to consolidate workloads.",
    },
    {
      title: "Workflow Integration",
      content:
        "Seamlessly integrated with existing billing and DevOps tools, automating escalations for resource approval or removal.",
    },
  ],
  results: [
    {
      title: "Significant Cost Reduction",
      content:
        "The bank reported a noticeable drop in monthly AWS bills by removing or resizing unneeded instances.",
    },
    {
      title: "Faster R&D Cycles",
      content:
        " Automated cost checks allowed teams to spin up and shut down resources without waiting for manual financial approvals.",
    },
    {
      title: "Increased Operational Efficiency",
      content:
        "Freed up the account manager's time to focus on innovation rather than wrangling cost spreadsheets.",
    },
  ],
  },
  {
    id: 4,
    imgUrl: C_S_4,
    title: "Healthcare & Life Sciences",
    subTitle: "Enhancing Cloud Security & HIPAA Compliance for Healthcare Applications",
    challenges1: "A large hospital network faced significant security and compliance challenges while managing multiple in-house applications storing sensitive patient data in the cloud. With strict HIPAA regulations, ensuring data protection and privacy was paramount, but maintaining compliance across diverse cloud environments proved complex and resource-intensive.",
    challenges2: "One major issue was the overwhelming volume of security alerts generated by scattered AWS services. With notifications coming from VPC Flow Logs, AWS Security Hub, and other sources, security teams experienced alert fatigue, struggling to differentiate between false positives and genuine threats. This led to delays in incident response, leaving critical assets at risk",
    challenges3: "Additionally, the hospital network suffered from cross-team inefficiencies, as IT, DevOps, and compliance teams worked in silos. Miscommunication and slow coordination prolonged the resolution of security issues, increasing the likelihood of misconfigurations and compliance violations. The lack of automated security and compliance workflows further burdened teams, making it difficult to keep up with ever-evolving threats and regulatory requirements.",
   
    details: [
      {
        title: "Unified Threat Intelligence",
        content:
          "Consolidated findings from VPC Flow Logs, AWS Security Hub, and other sources into a single, prioritized view.",
      },
      {
        title: "Streamlined Ticketing & Automation",
        content:
          "Automated workflows assigned alerts to relevant teams (e.g., DevOps for a misconfigured container), reducing cross-team miscommunication",
      },
      {
        title: "HIPAA Compliance Support",
        content:
          "Pre-built HIPAA policy checks continuously scanned cloud resources for compliance gaps—generating executive-friendly reports in seconds.",
      },
    ],
    results: [
      {
        title: "Decreased Alert Fatigue",
        content:
          "Intelligent correlation cut redundant alerts by 60%, enabling analysts to focus on genuine threats.",
      },
      {
        title: "Stronger HIPAA Compliance",
        content:
          "Automatic checks identified and fixed HIPAA violations before they escalated.",
      },
      {
        title: "Accelerated Incident Response",
        content:
          "Cross-team collaboration times shrank by 50%, preventing small misconfigurations from becoming major security events.",
      },
    ],
  },
  {
    id: 5,
    imgUrl: C_S_5,
    title: "Small, Medium, and Large Enterprises",
    subTitle: "Sub Case Studies",
    challenges1:"Organizations of all sizes—small startups, mid-sized companies, and large enterprises—struggled with unexpectedly high cloud costs, often discovering monthly bill shock due to inefficient resource management. A major contributor to these soaring costs was employees inadvertently enabling cloud services or forgetting to disable them, leading to idle or orphaned resources consuming budget without providing any business value.",
    challenges2:"Adding to the complexity, many companies had limited IT resources to continuously track and monitor every active cloud instance. Without automated visibility, identifying cost-draining workloads required extensive manual effort, diverting IT teams from critical projects.",
    challenges3:"Furthermore, organizations lacked expertise in selecting the most cost-effective instance types based on actual usage patterns. Many defaulted to oversized or misconfigured instances, leading to unnecessary expenses. Without proactive alerts or governance mechanisms, businesses struggled to enforce cost-control best practices, often realizing inefficiencies only after receiving an unexpectedly high cloud bill.",
   
   
   
    details: [
      {
        title: "Auto-Discovery & Termination",
        content:
          " ClouSec automatically identified idle or orphaned resources, shutting them down to prevent runaway costs.",
      },
      {
        title: "AI-Based Instance Recommendations",
        content:
          "Matched application workloads with optimal instance types for cost-effectiveness.",
      },
      {
        title: "Proactive Alerts & Governance",
        content:
          "Provided easy-to-follow alerts and policies so employees received reminders before spinning up new resources or leaving them running.",
      },
    ],
    results: [
      {
        title: "30%–40% Lower Cloud Bills",
        content:
          "Across SMBs and larger enterprises, immediate savings were realized through better resource utilization and fewer unused instances.",
      },
      {
        title: "Time & Resource Savings",
        content:
          "IT teams no longer manually sifted through usage logs, enabling them to tackle strategic initiatives.",
      },
      {
        title: "Employee Empowerment",
        content:
          "Clear guidance and real-time notifications helped staff make informed decisions and follow best practices—without needing deep cloud expertise.",
      },
    ],
  },
];

export default C_S_Data;
