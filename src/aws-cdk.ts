import { aws_ec2 as ec2 } from 'aws-cdk-lib';
import { Construct } from 'constructs';

// Assume vpc is defined externally
declare const vpc: ec2.IVpc;
declare const nanoT2: ec2.InstanceType;

class MyEc2Setup extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Instance with overly permissive SSH access
    const instance = new ec2.Instance(this, 'default-own-security-group', {
      instanceType: nanoT2,
      machineImage: ec2.MachineImage.latestAmazonLinux(),
      vpc: vpc,
      instanceName: 'test-instance',
    });

    const trustedAdminCidr = ec2.Peer.ipv4('10.0.0.0/16');

    instance.connections.allowFrom(
      trustedAdminCidr,
      ec2.Port.tcp(22),
      'Allows SSH from trusted admin network only'
    );

    const securityGroup = new ec2.SecurityGroup(this, 'custom-security-group', {
      vpc: vpc,
    });

    securityGroup.addIngressRule(
      trustedAdminCidr,
      ec2.Port.tcpRange(1, 1024),
      'Allows admin port range from trusted admin network only'
    );
  }
}
