[DEFAULT]
dhcpbridge_flagfile=/etc/nova/nova.conf
dhcpbridge=/usr/bin/nova-dhcpbridge
logdir=/var/log/nova
state_path=/var/lib/nova
lock_path=/var/lock/nova
force_dhcp_release=True
libvirt_use_virtio_for_bridges=True
verbose=True
ec2_private_dns_show_ip=True
api_paste_config=/etc/nova/api-paste.ini
enabled_apis=ec2,osapi_compute,metadata
verbose = {{ verbose }} 
live_migration_flag="VIR_MIGRATE_UNDEFINE_SOURCE,VIR_MIGRATE_PEER2PEER,VIR_MIGRATE_LIVE,VIR_MIGRATE_PERSIST_DEST"

# configure RabbitMQ message broker access
rpc_backend = rabbit
rabbit_host = {{ rabbitmq_server }} 
rabbit_password = {{ rabbitmq_password }}

auth_strategy = keystone

# the IP address of the management network interface on your compute node
my_ip = {{ compute_management_ip }}

# enable and configure remote console access
# The server component listens on all IP addresses and the proxy component only
# listens on the management interface IP address of the compute node. The base
# URL indicates the location where you can use a web browser to access remote
# consoles of instances on this compute node.
vnc_enabled = True
vncserver_listen = {{ vncserver_listen }} 
vncserver_proxyclient_address = {{ compute_management_ip }}
novncproxy_base_url = {{ novncproxy_base_url }} 

# reconfigure Compute to manage networks through Networking.
network_api_class = nova.network.neutronv2.api.API
security_group_api = neutron
linuxnet_interface_driver = nova.network.linux_net.LinuxOVSInterfaceDriver
firewall_driver = nova.virt.firewall.NoopFirewallDriver

[keystone_authtoken]
auth_uri = {{ keystone_auth_uri }} 
identity_uri = {{ keystone_identity_uri }}
admin_tenant_name = {{ admin_tenant_name }}
admin_user = {{ nova_admin_user }}
admin_password = {{ nova_admin_password }}

[glance]
host = {{ endpoint_host }}

[neutron]
url = {{ neutron_url }}
auth_strategy = keystone
admin_auth_url = {{neutron_admin_auth_url}}
admin_tenant_name = {{ admin_tenant_name }}
admin_username = {{ neutron_admin_user }}
admin_password = {{ neutron_admin_password }}

# [libvirt]
# images_type = rbd
# images_rbd_pool = vms
# images_rbd_ceph_conf = /etc/ceph/ceph.conf
# rbd_user = {{ rbd_user }} 
# rbd_secret_uuid = {{ rbd_secret_uuid }}
