import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('[Seed] Starting database seed for multi-tenant workspaces...');

  // 1. Upsert Acme Corp Workspace
  const acmeWorkspace = await prisma.workspace.upsert({
    where: { slug: 'acme-corp' },
    update: {},
    create: {
      name: 'Acme Corp',
      slug: 'acme-corp',
    },
  });

  // 2. Upsert Globex Ltd Workspace
  const globexWorkspace = await prisma.workspace.upsert({
    where: { slug: 'globex-ltd' },
    update: {},
    create: {
      name: 'Globex Ltd',
      slug: 'globex-ltd',
    },
  });

  // 3. Upsert Users
  const alice = await prisma.user.upsert({
    where: { email: 'alice@acme.com' },
    update: {},
    create: {
      email: 'alice@acme.com',
      name: 'Alice Acme (Owner)',
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@acme.com' },
    update: {},
    create: {
      email: 'bob@acme.com',
      name: 'Bob Acme (Member)',
    },
  });

  const charlie = await prisma.user.upsert({
    where: { email: 'charlie@globex.com' },
    update: {},
    create: {
      email: 'charlie@globex.com',
      name: 'Charlie Globex (Owner)',
    },
  });

  const diana = await prisma.user.upsert({
    where: { email: 'diana@globex.com' },
    update: {},
    create: {
      email: 'diana@globex.com',
      name: 'Diana Globex (Viewer)',
    },
  });

  // 4. Create Memberships
  // Acme memberships
  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: acmeWorkspace.id,
        userId: alice.id,
      },
    },
    update: { role: Role.OWNER },
    create: {
      workspaceId: acmeWorkspace.id,
      userId: alice.id,
      role: Role.OWNER,
    },
  });

  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: acmeWorkspace.id,
        userId: bob.id,
      },
    },
    update: { role: Role.MEMBER },
    create: {
      workspaceId: acmeWorkspace.id,
      userId: bob.id,
      role: Role.MEMBER,
    },
  });

  // Globex memberships
  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: globexWorkspace.id,
        userId: charlie.id,
      },
    },
    update: { role: Role.OWNER },
    create: {
      workspaceId: globexWorkspace.id,
      userId: charlie.id,
      role: Role.OWNER,
    },
  });

  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: globexWorkspace.id,
        userId: diana.id,
      },
    },
    update: { role: Role.VIEWER },
    create: {
      workspaceId: globexWorkspace.id,
      userId: diana.id,
      role: Role.VIEWER,
    },
  });

  console.log('[Seed] Multi-tenant seed completed successfully:');
  console.log(
    `  - Workspace: ${acmeWorkspace.name} (${acmeWorkspace.id}) with Alice (OWNER) and Bob (MEMBER)`,
  );
  console.log(
    `  - Workspace: ${globexWorkspace.name} (${globexWorkspace.id}) with Charlie (OWNER) and Diana (VIEWER)`,
  );
}

main()
  .catch((e) => {
    console.error('[Seed] Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
